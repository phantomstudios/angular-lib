import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {setupComponentTestingModule} from '../testing/test-lib';

import {FilesDropAreaModule} from './files-drop-area';

@Component({
  template: `
    <div class="component" filesDropArea (filesDrop)="onFilesDropped($event)">
    </div>
  `,
})
class MockComponent {
  readonly droppedFiles: File[] = [];

  onFilesDropped(files: FileList) {
    // It is not possible to add Files to an object created with the FileList
    // constructor when we want to test this method has been called with the
    // correct arguments, so it's easier to assign the results of the call to a
    // public property on the test component and test that the Files in this
    // array are what we expect them to be.
    for (const file of files) {
      this.droppedFiles.push(file);
    }
  }
}

describe('The FilesDropAreaDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    setupComponentTestingModule({
      declarations: [MockComponent],
      imports: [FilesDropAreaModule],
    });

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  });

  it('adds the active class when the user drags files over the host element',
     () => {
       fixture.nativeElement.querySelector('.component')
           .dispatchEvent(new DragEvent('dragover'));
       fixture.detectChanges();

       const elementClassList = fixture.debugElement.query(By.css('.component'))
                                    .nativeElement.classList;
       expect(elementClassList.value).toContain('dragover-active');
     });

  it('removes the active class when the user drags over and then out of the ' +
         'host element',
     () => {
       fixture.nativeElement.querySelector('.component')
           .dispatchEvent(new DragEvent('dragover'));
       fixture.detectChanges();

       fixture.nativeElement.querySelector('.component')
           .dispatchEvent(new DragEvent('dragleave'));
       fixture.detectChanges();

       const elementClassList = fixture.debugElement.query(By.css('.component'))
                                    .nativeElement.classList;
       expect(elementClassList.value).not.toContain('dragover-active');
     });

  it('removes the active class when the user drops a file', () => {
    fixture.nativeElement.querySelector('.component')
        .dispatchEvent(new DragEvent('dragover'));
    fixture.detectChanges();

    const event = new DragEvent('drop', {dataTransfer: new DataTransfer()});
    fixture.nativeElement.querySelector('.component').dispatchEvent(event);
    fixture.detectChanges();

    const elementClassList = fixture.debugElement.query(By.css('.component'))
                                 .nativeElement.classList;
    expect(elementClassList.value).not.toContain('dragover-active');
  });

  it('emits the files when the user drops on the element', () => {
    const dropSpy = spyOn(component, 'onFilesDropped').and.callThrough();
    const mockFile = new File([''], 'dummy.jpg');
    const mockdataTransfer = new DataTransfer();
    mockdataTransfer.items.add(mockFile);

    fixture.nativeElement.querySelector('.component')
        .dispatchEvent(new DragEvent('drop', {dataTransfer: mockdataTransfer}));
    fixture.detectChanges();

    expect(dropSpy).toHaveBeenCalledTimes(1);
    expect(component.droppedFiles[0]).toEqual(mockFile);
  });
});
