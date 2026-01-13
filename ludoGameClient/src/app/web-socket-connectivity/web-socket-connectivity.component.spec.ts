import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketConnectivityComponent } from './web-socket-connectivity.component';

describe('WebSocketConnectivityComponent', () => {
  let component: WebSocketConnectivityComponent;
  let fixture: ComponentFixture<WebSocketConnectivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSocketConnectivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSocketConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
