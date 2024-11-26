import React from "react"
import { render } from "@testing-library/react"
import { Link } from "core/components/layout-utils"

describe("<Link/> Anchor Target Safety", function () {
  const dummyComponent = () => null
  const components = {
    Link
  }
  const baseProps = {
    getComponent: c => components[c] || dummyComponent
  }

  it("renders regular links with `noreferrer` and `noopener`", function () {
    const props = {
      ...baseProps,
      href: "http://google.com/"
    }
    const { getByRole } = render(<Link {...props} />)
    const anchor = getByRole("link")

    expect(anchor).toHaveAttribute("href", "http://google.com/")
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
  })

  it("enforces `noreferrer` and `noopener` on target=_blank links", function () {
    const props = {
      ...baseProps,
      href: "http://google.com/",
      target: "_blank"
    }
    const { getByRole } = render(<Link {...props} />)
    const anchor = getByRole("link")

    expect(anchor).toHaveAttribute("href", "http://google.com/")
    expect(anchor).toHaveAttribute("target", "_blank")
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
    expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
  })
})
