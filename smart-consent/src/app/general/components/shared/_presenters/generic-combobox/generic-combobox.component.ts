import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-combobox',
  templateUrl: './generic-combobox.component.html',
  styleUrls: ['./generic-combobox.component.css']
})
export class GenericComboboxComponent implements OnInit {

  @Input() parameters: any;
  @Input() otpForm: any;

  constructor() { }

  ngOnInit(): void { }

}
