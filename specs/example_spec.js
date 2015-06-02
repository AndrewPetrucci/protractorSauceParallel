'use strict';
//var webdriver = require("selenium-webdriver");

function getDragDropTestPage(){
  browser.get("http://www.snook.ca/technical/mootoolsdragdrop/");
  browser.sleep(5000);
  expect(browser.getTitle()).toEqual("Mootools Drag and Drop Example");
}

function dragDrop(from_e, to_e){
  browser.actions()
    .mouseMove(from_e.find())
    .mouseDown()
    .mouseMove(from_e.find(), {x: 5, y: 5}) // Initial move to trigger drag start
    .mouseMove(to_e.find())
    .mouseUp()
    .perform();
  browser.sleep(200);
}

describe("protractor tests", function(){
  beforeEach(function(){ browser.ignoreSynchronization = true; }); //does not wait for angula
  it("should test Drag-n-Drop method", function(){
    getDragDropTestPage();
    dragDrop(element(by.id("dragger")), element(by.css("div[class='item']")));
    expect(element(by.css("div[class='item dragover dropped']")).getText()).toEqual("dropped");
  });
});