import { render ,screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import ResponseBody from "core/components/response-body"

describe("<ResponseBody />", function () {

  // Mock component
  const HighlightCode = ({ children, canCopy }) => (
    <div data-testid="highlight-code" data-cancopy={canCopy}>
      {children}
    </div>
  )

  const components = {
    HighlightCode
  }
  const props = {
    getComponent: c => components[c],
  }

  it("renders ResponseBody as 'application/json'", function () {
    props.contentType = "application/json"
    props.content = "{\"key\": \"a test value\"}"
    render(<ResponseBody {...props} />)
    expect(screen.getByTestId("highlight-code")).toBeInTheDocument()
  })

  it("renders ResponseBody as 'text/html'", function () {
    props.contentType = "application/json"
    props.content = "<b>Result</b>"
    render(<ResponseBody {...props} />)
    expect(screen.getByTestId("highlight-code")).toBeInTheDocument()
  })

  it("renders ResponseBody as 'image/svg'", function () {
    props.contentType = "image/svg"
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.querySelectorAll("HighlightCode").length).toEqual(0)
  })

  it("should render a copyable highlightCodeComponent for text types", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    render(<ResponseBody {...props} />)
    const copyableCode = screen.getByTestId("highlight-code")
    expect(copyableCode).toBeInTheDocument()
    expect(copyableCode).toHaveAttribute("data-cancopy")
  })

  it("should render Download file link for non-empty Blob response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob(["\"test\""], { type: props.contentType })
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).toMatch(/Download file/)
  })

  it("should render Download file link for non-empty text response", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    props.headers = {
      "Content-Disposition": "attachment; filename=\"test.txt\"",
    }
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).toMatch(/Download file/)
  })

  it("should not render Download file link for empty response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob()
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).not.toMatch(/Download file/)
  })
})
