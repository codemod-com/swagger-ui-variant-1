import React from "react"
import { render } from "@testing-library/react"
import Markdown from "core/components/providers/markdown"

describe("UI-3199: Sanitized Markdown causing code examples to be double escaped", function(){
  it("should single-escape quotes", function(){

    let str = "" +
    "This is a test: \n\n" +
    "    {\"abc\": \"def\"}\n"

    let props = {
      source: str
    }

    const { container } = render(<Markdown {...props} />)
    const codeElement = container.querySelector("code")

    expect(codeElement.textContent).toEqual("{\"abc\": \"def\"}\n")
    expect(codeElement.innerHTML).toEqual("{\"abc\": \"def\"}\n")
  })
})
