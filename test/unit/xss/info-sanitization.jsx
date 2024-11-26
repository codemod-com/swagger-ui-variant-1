import React from "react"
import { render } from "@testing-library/react"
import { fromJS } from "immutable"
import Info from "core/components/info"
import Markdown from "core/components/providers/markdown"

describe("<Info/> Sanitization", function(){
	const dummyComponent = () => null
	const components = {
		Markdown
	}
	const props = {
		getComponent: c => components[c] || dummyComponent,
		info: fromJS({
			title: "Test Title **strong** <script>alert(1)</script>",
			description: "Description *with* <script>Markdown</script>"
		}),
		host: "example.test",
		basePath: "/api",
		selectedServer: "https://example.test",
	}

	it("renders sanitized .title content", function(){
		const { container } = render(<Info {...props}/>)
		expect(container.querySelector(".title").innerHTML).toEqual("Test Title **strong** &lt;script&gt;alert(1)&lt;/script&gt;<span></span>")
	})

	it("renders sanitized .description content", function() {
		const { container } = render(<Info {...props}/>)
		expect(container.querySelector(".description").innerHTML).toEqual("<div class=\"markdown\"><p>Description <em>with</em> </p>\n</div>")
	})
})
