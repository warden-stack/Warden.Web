import {inject, bindable, bindingMode, containerless} from 'aurelia-framework';

@containerless
@inject(Element)
export class TextEditor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable name;

  constructor(element) {
    this.element = element;
  }

  updateValue() {
    this.value = this.textArea.value;
  }

  bind() {
    this.textArea = this.element.parentElement.getElementsByTagName('textarea')[0];
    let editor = CKEDITOR.replace(this.textArea, {
      removePlugins: 'toolbar,elementspath',
      height: '500px'
    });
    this.editorName = editor.name;
    editor.on('change', (e) => {
      this.value = e.editor.editable().getText();
    });
  }
}