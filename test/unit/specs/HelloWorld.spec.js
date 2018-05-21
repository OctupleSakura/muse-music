import Vue from 'vue'
import slider from '@/components/slider'

describe('slider.vue', () => {
  // 检查msg
  it('should render correct contents', () => {
    // 组件实例
    const Constructor = Vue.extend(slider);
    expect(slider.currentPageIndex).to.eql(0);
  })
})
