import React from "react"
import { render } from "@testing-library/react"
import OperationTag from "core/components/operation-tag"
import Im from "immutable"
import { Link } from "core/components/layout-utils"

describe("<OperationTag/>", function(){
  it("render externalDocs URL for swagger v2", function(){
    const dummyComponent = () => null
    const components = {
      Collapse: () => dummyComponent,
      Markdown: () => dummyComponent,
      DeepLink: () => dummyComponent,
      Link,
      ArrowUpIcon: dummyComponent,
      ArrowDownIcon: dummyComponent,
    }
    
    let props = {
      tagObj: Im.fromJS({
        tagDetails: {
          externalDocs: {
            description: "Find out more",
            url: "http://swagger.io"
          }
        }
      }),
      tag: "testtag",
      getConfigs: () => ({}),
      getComponent: c => components[c],
      layoutSelectors: {
        currentFilter() {
          return null
        },
        isShown() {
          return true
        },
        show() {
          return true
        },
      }
    }
    
    const { getByTestId, getByText } = render(<OperationTag {...props} />)
 
    const opblockTag = getByTestId("opblock-tag")
    expect(opblockTag.tagName).toBe("H3")
    
    const renderedLink = getByText("Find out more")
    expect(renderedLink.getAttribute("href")).toBe("http://swagger.io")
  })
})