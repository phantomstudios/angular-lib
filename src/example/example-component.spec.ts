import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setupComponentTestingModule } from "../testing/test-lib";

import { PhExampleComponent } from "./example-component";

describe("The PhExampleComponent", () => {
  let component: PhExampleComponent;
  let fixture: ComponentFixture<PhExampleComponent>;

  beforeEach(() => {
    setupComponentTestingModule({ declarations: [PhExampleComponent] });

    fixture = TestBed.createComponent(PhExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
