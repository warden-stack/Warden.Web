import {inject} from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import ApiKeyService from 'resources/services/api-key-service';

@inject(ApiKeyService)
export class ApiKeysIndex {
  constructor(apiKeyService) {
    this.apiKeyService = apiKeyService;
  }

  async activate() {
    this.apiKeys = await this.apiKeyService.getAll();
  }

  copyKey(keyIndex) {
    function selectText(element) {
      var range = document.createRange();    // Create new range object
      range.selectNodeContents(element);      // Set range to encompass desired element text
      var selection = window.getSelection(); // Get Selection object from currently user selected text
      selection.removeAllRanges();           // Unselect any user selected text (if any)
      selection.addRange(range);             // Add range to Selection object to select it
    }
    const keyElement = document.getElementsByClassName('w-api-key')[keyIndex]
    selectText(keyElement);
    document.execCommand('copy');
  }
}
