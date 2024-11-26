import React from "react"
import { render } from "@testing-library/react"
import Markdown from "core/components/providers/markdown"
import { Markdown as OAS3Markdown } from "core/plugins/oas3/wrap-components/markdown.jsx"

describe("Markdown Link Anchor Safety", function () {
  describe("Swagger 2.0", function () {
    it("sanitizes Markdown links", function () {
      const str = `Hello, [here](http://google.com/) is my link`
      const { getByText } = render(<Markdown source={str} />)

      const anchor = getByText("here").closest("a")

      expect(anchor).toHaveAttribute("href", "http://google.com/")
      expect(anchor).toHaveAttribute("target", "_blank")
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
    })

    it("sanitizes raw HTML links", function () {
      const str = `Hello, <a href="http://google.com/">here</a> is my link`
      const { getByText } = render(<Markdown source={str} />)

      const anchor = getByText("here").closest("a")

      expect(anchor).toHaveAttribute("href", "http://google.com/")
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
    })
  })

  describe("OAS 3", function () {
    it("sanitizes Markdown links", function () {
      const str = `Hello, [here](http://google.com/) is my link`
      const { getByText } = render(<OAS3Markdown source={str} />)

      const anchor = getByText("here").closest("a")

      expect(anchor).toHaveAttribute("href", "http://google.com/")
      expect(anchor).toHaveAttribute("target", "_blank")
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
    })

    it("sanitizes raw HTML links", function () {
      const str = `Hello, <a href="http://google.com/">here</a> is my link`
      const { getByText } = render(<OAS3Markdown source={str} />)

      const anchor = getByText("here").closest("a")

      expect(anchor).toHaveAttribute("href", "http://google.com/")
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
    })
  })
})
