import { render } from "@testing-library/react"
import React from "react"
import Operation from "core/components/operation"

describe("<Operation/>", function(){
  it.skip("blanket tests", function(){

    let props = {
      operation: {get: ()=>{}},
      getComponent: ()=> "div",
      specSelectors: { security(){} },
      path: "/one",
      method: "get",
      shown: true,
      showOpId: "",
      showOpIdPrefix: "",
      toggleCollapse: jest.fn()
    }

    let {
      container
    } = render(<Operation {...props}/>)

    expect(container.querySelectorAll(".opblock").length).toEqual(1)
    expect(container.querySelectorAll(".opblock-summary-method").textContent).toEqual("GET")
    expect(container.querySelectorAll(".opblock-summary-path").textContent.trim()).toEqual("/one")
    expect(container.querySelectorAll("[isOpened]").prop("isOpened")).toEqual(true)

    container.querySelectorAll(".opblock-summary").simulate("click")
    expect(props.toggleCollapse).toHaveBeenCalled()
  })
})