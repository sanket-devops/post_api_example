import {Component, OnInit} from '@angular/core';
import {TestService} from './test.service';
import {Idata} from './Idata';
import 'toastr';

declare let $: any;
declare let toastr: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataTable;
  data: Idata = <any>{};
  constructor(public testService: TestService) {
  }
  ngOnInit() {
    this.loadData();
  }
  add() {
    this.data = <any>{};
  }
  loadData() {
    this.testService.getApi().subscribe((data: Idata[]) => {
      if (this.dataTable) {
        this.dataTable.destroy();
        toastr.success('Data Loaded Sucsessfully!');
      }
      this.dataTable = $('#example').DataTable({
        data: data,
        columns: [
          {title: 'id', data: 'id'},
          {title: 'userId', data: 'userId'},
          {title: 'title', data: 'title'},
          {title: 'body', data: 'body'},
          {
            title: 'Action',
            render: (obj, type, row: Idata) => {
              // console.log(row);
              return `<div class="text-nowrap">
                        <button name="action_delete" data-id="${row.id}" class="btn btn-danger">Delete</button>
                        <button name="action_edit" data-id="${row.id}" class="btn btn-primary">Edit</button>
                      </div>
                  `;
            }
          },
        ],
        initComplete: () => {
          $('button[name=\'action_delete\']').on('click', async (event: Event) => {
            let element = $(event.target);
            let id: string = element.data('id');
            // perform delete api call.
            console.log(id);
            let res = await this.testService.deleteApi(id).toPromise();
            console.log(res);
            this.loadData();
            toastr.success('Data Deleted Sucsessfully!');
          });
          $('button[name=\'action_edit\']').on('click', async (event: Event) => {
            let element = $(event.target);
            let id: string = element.data('id');

            // perform edit api call.
            console.log(id);
            $('#myModal').modal('show');
            let res = await this.testService.getById(id).toPromise();
            this.data = <any>res;
          });
        }
      });
    });
  }
  async saveData() {
    // console.log(this.data);

    if (this.data.id) {
      // edit
      let res = await this.testService.updateData(this.data).toPromise();
      console.log(res);
      $('#myModal').modal('hide');
      toastr.success('Data Updated Sucsessfully!');
    } else {
      // add
      let res = await this.testService.postData(this.data).toPromise();
      console.log(res);
      $('#myModal').modal('hide');
      toastr.success('Data Added Sucsessfully!');
    }
  }
}
