import { render,screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import expect from "expect"
import HighlightCode from "core/plugins/syntax-highlighting/components/HighlightCode"
import SyntaxHighlighter from "core/plugins/syntax-highlighting/components/SyntaxHighlighter"

const fakeGetConfigs = () => ({ syntaxHighlight: { activated: true, theme: "agate" }})
const fakeGetComponent = (name, isContainer) => {
  const components = { HighlightCode, SyntaxHighlighter }
  const Component = components[name]

  if (isContainer) {
    return ({ ...props }) => {
      return <Component getConfigs={fakeGetConfigs} getComponent={fakeGetComponent} {...props} />
    }
  }

  return Component
}

describe("<HighlightCode />", () => {
  it("should render a Download button if downloadable", () => {
    const props = { downloadable: true, getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    const {
      container
    } = render(<HighlightCode {...props} />)
    expect(container.querySelectorAll(".download-contents").length).toEqual(1)
  })

  it("should render a Copy To Clipboard button if copyable", () => {
    const props = { canCopy: true, getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    render(<HighlightCode {...props} />)
    const copyButton = screen.queryByRole("button", { name: /copy/i })
    expect(copyButton).toBeInTheDocument()
    
  })

  it("should render values in a preformatted element", () => {
    const value = "test text"
    const props = { children: value , getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    const {
      container
    } = render(<HighlightCode {...props} />)
    const preTag = container.querySelectorAll("pre")

    expect(preTag.length).toEqual(1)
    expect(preTag[0].textContent).toEqual(value)
  })
})
