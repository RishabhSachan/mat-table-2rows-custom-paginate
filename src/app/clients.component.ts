import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from './cliente.service';
import { Client } from './client.class';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  editIndex = 0;
  public displayedColumns: string[] = ['name'];
  public client: Client;
  public clients: Client[];
  pageSize = 5;

  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit() {
    this.getClients();
  }

  pgEvent(e) {
    this.dataSource.data = this.clients.slice(
      e.pageIndex * e.pageSize * 2,
      e.pageIndex * e.pageSize * 2 + e.pageSize * 2
    );
  }

  getClients() {
    this.clienteService.list().subscribe((client) => {
      this.clients = client;
      this.dataSource = new MatTableDataSource(
        this.clients.slice(0, this.pageSize * 2)
      );
      this.paginator.length = this.clients.length / 2;
    });
  }
}
