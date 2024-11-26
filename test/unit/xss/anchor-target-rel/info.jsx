import React from "react"
import { render } from "@testing-library/react"
import { fromJS } from "immutable"
import Info, { InfoUrl } from "core/components/info"
import Contact from "core/components/contact"
import License from "core/components/license"
import { Link } from "core/components/layout-utils"
import Markdown from "core/components/providers/markdown"

describe("<Info/> Anchor Target Safety", function(){
	const dummyComponent = () => null
	const components = {
		Markdown,
		InfoUrl,
		License,
    Contact,
		Link,
	}
	const baseProps = {
		getComponent: c => components[c] || dummyComponent,
		host: "example.test",
		basePath: "/api",
		info: fromJS({
			title: "Hello World"
		})
	}

	it("renders externalDocs links with safe `rel` attributes", function () {
		const props = {
			...baseProps,
			externalDocs: fromJS({
				url: "http://google.com/"
			})
		}
		const { getByRole } = render(<Info {...props} />)
		const anchor = getByRole("link")

		expect(anchor).toHaveAttribute("href", "http://google.com/")
		expect(anchor).toHaveAttribute("target", "_blank")
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
	})

	it("renders Contact links with safe `rel` attributes", function () {
		const props = {
			...baseProps,
			info: fromJS({
				contact: {
					url: "http://google.com/",
					name: "My Site"
				}
			})
		}
		const { getByRole } = render(<Info {...props} />)
		const anchor = getByRole("link")

		expect(anchor).toHaveAttribute("href", "http://google.com/")
		expect(anchor).toHaveAttribute("target", "_blank")
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
	})

	it("renders License links with safe `rel` attributes", function () {
		const props = {
			...baseProps,
			info: fromJS({
				license: {
					url: "http://mit.edu/"
				}
			})
		}
		const { getByRole } = render(<Info {...props} />)
		const anchor = getByRole("link")

		expect(anchor).toHaveAttribute("href", "http://mit.edu/")
		expect(anchor).toHaveAttribute("target", "_blank")
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
	})

	it("renders termsOfService links with safe `rel` attributes", function () {
		const props = {
			...baseProps,
			info: fromJS({
				termsOfService: "http://smartbear.com/"
			})
		}
		const { getByRole } = render(<Info {...props} />)
		const anchor = getByRole("link")

		expect(anchor).toHaveAttribute("href", "http://smartbear.com/")
		expect(anchor).toHaveAttribute("target", "_blank")
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
	})

	it("renders definition URL links with safe `rel` attributes", function () {
		const props = {
			...baseProps,
			url: "http://petstore.swagger.io/v2/petstore.json"
		}
		const { getByRole } = render(<Info {...props} />)
		const anchor = getByRole("link")

		expect(anchor).toHaveAttribute("href", "http://petstore.swagger.io/v2/petstore.json")
		expect(anchor).toHaveAttribute("target", "_blank")
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"))
		expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"))
	})
})
