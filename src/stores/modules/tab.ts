import { defineStore } from 'pinia';
import { TabsState, TabsMenuProps } from '@/stores/interface';
import piniaPersistConfig from '@/config/piniaPersist';
import router from '@/router/index';

// TabsStore
export const TabsStore = defineStore({
  id: "TabsState",
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  actions: {
    // 添加tabs
    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        // 在列表中不存在则添加进来
        this.tabsMenuList.push(tabItem);
      }
    },
    // 删除|关闭tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      const tabsMenuList = this.tabsMenuList;
      // 判断是否当前所在的路由
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          // 找到当前要关闭的tab
          if (item.path !== tabPath) return;
          // 关闭当前的tab后，设置即将显示的路由
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // 过滤相同的tab
      this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
    },
    // 关闭 MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
    },
    // 设置 Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    // 设置当前tab的title
    async setTabsTitle(title: string) {
      // 当前的路由
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach(item => {
        if (item.path === nowFullPath) item.title = title;
      });
    }
  },
  // 持久化储存
  persist: piniaPersistConfig("TabsState")
});
