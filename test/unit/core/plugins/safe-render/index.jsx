import React from "react"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import noop from "lodash/noop"
import System from "core/system"
import ViewPlugin from "core/plugins/view"
import SafeRenderPlugin from "core/plugins/safe-render"

describe("safe-render", function() {
  const DisableComponentDidCatchPlugin = () => ({
    fn: {
      componentDidCatch: noop,
    }
  })

  it("should catch errors thrown inside of React Component class render method", function() {
    class BrokenComponent extends React.Component {
      render() {
        throw new Error("broken")
      }
    }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent")
    const {container} = render(<SafeBrokenComponent />)
    expect(container).toHaveTextContent("😱 Could not render BrokenComponent, see the console.")
  })

  it("should catch errors thrown inside of PureComponent class render method", function() {
    class BrokenComponent extends React.PureComponent {
      render() {
        throw new Error("broken")
      }
    }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent")
    const {container} = render(<SafeBrokenComponent />)
    expect(container).toHaveTextContent("😱 Could not render BrokenComponent, see the console.")
  })

  it("should catch errors thrown inside of function component", function() {
    const BrokenComponent = () => { throw new Error("broken") }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent")
    const {container} = render(<SafeBrokenComponent />)
    expect(container).toHaveTextContent("😱 Could not render BrokenComponent, see the console.")
  })

  it("should catch errors thrown inside of container created from React Component class", function() {
    class BrokenComponent extends React.Component {
      render() {
        throw new Error("broken")
      }
    }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent", true)
    const {container} = render(
      <Provider store={system.getStore()}>
        <SafeBrokenComponent />
      </Provider>
    )
    expect(container).toHaveTextContent("😱 Could not render BrokenComponent, see the console.")
  })

  it("should catch errors thrown inside of container created from function component", function() {
    const BrokenComponent = () => { throw new Error("broken") }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent", true)
    const {container} = render(
      <Provider store={system.getStore()}>
        <SafeBrokenComponent />
      </Provider>
    )
    expect(container).toHaveTextContent("😱 Could not render BrokenComponent, see the console.")
  })

  it("should render custom Fallback component", function() {
    const BrokenComponent = () => { throw new Error("broken") }
    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }
    const FallbackPlugin = () => ({
      components: {
        Fallback: () => "fallback component",
      },
    })

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        FallbackPlugin,
        DisableComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent")
    const {container} = render(<SafeBrokenComponent />)
    expect(container).toHaveTextContent("fallback component")
  })

  it("should call custom componentDidCatch hook", function() {
    const BrokenComponent = () => { throw new Error("broken") }
    const componentDidCatch = jest.fn()

    const BrokenComponentPlugin = () => {
      return {
        components: {
          BrokenComponent,
        }
      }
    }
    const ComponentDidCatchPlugin = () => ({
      fn: {
        componentDidCatch,
      },
    })

    const system = new System({
      plugins: [
        ViewPlugin,
        BrokenComponentPlugin,
        SafeRenderPlugin({
          fullOverride: true,
          componentList: ["BrokenComponent"],
        }),
        ComponentDidCatchPlugin,
      ]
    })

    const SafeBrokenComponent = system.getSystem().getComponent("BrokenComponent")
    render(<SafeBrokenComponent />)
    expect(componentDidCatch).toHaveBeenCalled()
  })
})
