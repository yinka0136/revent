import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  public ticketsLoading: boolean = false;
  public filterableTickets: any[] = [
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'resolved',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'pending',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'resolved',
      date: new Date(),
    },
    {
      id: '#42159',
      subject: 'Subject Document Matter',
      status: 'pending',
      date: new Date(),
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
