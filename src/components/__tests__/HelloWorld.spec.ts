import {describe, it, expect} from "vitest";
import {flushPromises, mount, type MountingOptions, VueWrapper} from "@vue/test-utils";
import {type ComponentPublicInstance, defineComponent} from "vue";
import HelloWorld from "../HelloWorld.vue";

/**
 * Creates a Wrapper that contains the mounted and rendered Vue component.
 *
 * @param component The asynchronous component to mount using suspense.
 * @param options   The mount options.
 *
 * @returns The mounted component wrapper.
 */
async function mountWithSuspense<Component extends ComponentPublicInstance, Props>(
    component: new () => Component,
    options: MountingOptions<Props>
): Promise<VueWrapper<ComponentPublicInstance>> {
    const wrapper = defineComponent({
        components: { [component.name]: component },
        props: Object.keys(options.props ?? {}),
        template: `<suspense><${component.name} v-bind="$props" /></suspense>`
    })

    const result = mount(wrapper, options)

    await flushPromises()

    return result
}

describe('HelloWorld', () => {
    it('mounts properly', async () => {
        const wrapper = await mountWithSuspense(HelloWorld, {})
        // expect(wrapper.vm.hello).toEqual('')
        await wrapper.vm.helloWorld()
        expect(wrapper.vm.hello).toEqual('world')
    })
})