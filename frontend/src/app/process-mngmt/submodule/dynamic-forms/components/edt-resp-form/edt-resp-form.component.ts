import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edt-resp-form',
  templateUrl: './edt-resp-form.component.html',
  styleUrls: ['./edt-resp-form.component.scss']
})
export class EdtRespFormComponent implements OnInit {
  public respondentForm: any;// RespondentForm
  public structure: any;

  constructor() { }

  ngOnInit(): void { }

}