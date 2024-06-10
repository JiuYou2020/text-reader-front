### 项目目录结构文档

#### 1. 显示层

##### 1.1 路由（Navigator）

路由层负责管理应用内的所有页面（Screen），包括配置路由跳转规则、转场动画和 header 样式等。

目录结构：

```
src/
├── navigation/
│   ├── AppNavigator.js
│   └── AuthNavigator.js
```

**AppNavigator.js**: 配置主要应用内的所有路由和导航规则。
**AuthNavigator.js**: 配置登录和注册等认证相关的路由。

##### 1.2 容器组件（Screen）

每个页面对应一个容器组件，负责管理页面内的数据和显示组件。对于简单项目，可以将控制层的功能合并到容器组件内；对于复杂项目，可以单独创建控制器文件管理数据和交互。

简单项目结构：

```
src/
├── screens/
│   ├── HomeScreen.js
│   ├── DetailScreen.js
│   └── ProfileScreen.js
```

复杂项目结构：

```
src/
├── screens/
│   ├── HomeScreen/
│   │   ├── HomeScreen.js
│   │   └── HomeController.js
│   ├── DetailScreen/
│   │   ├── DetailScreen.js
│   │   └── DetailController.js
│   └── ProfileScreen/
│       ├── ProfileScreen.js
│       └── ProfileController.js
```

**HomeScreen.js**: 主页容器组件。
**HomeController.js**: 主页控制器，处理数据和业务逻辑。

##### 1.3 显示组件（View）

显示组件只承担显示职责，不处理任何业务逻辑。这些组件在项目内会被高复用。在任何页面内，传递指定的数据格式即可实现复用。

目录结构：

```
src/
├── components/
│   ├── Button.js
│   ├── Header.js
│   ├── ListItem.js
│   └── Modal.js
```

**Button.js**: 按钮组件。
**Header.js**: 头部组件。

#### 2. 样式（Style）

样式文件夹（或称 UI 文件夹）内的内容需要和项目团队内的 UI 设计师沟通设计规范后确定，记录了整个应用的设计规范。

目录结构：

```
src/
├── styles/
│   ├── colors.js
│   ├── typography.js
│   └── layout.js
```

**colors.js**: 包含项目内使用的所有颜色，例如 primaryColor、bgColor 等。
**typography.js**: 包含项目内使用的所有字体和字号。
**layout.js**: 定义全局的布局规范和边距值。

#### 3. 控制层（Controller）

控制层的工作可以由容器组件承担，也可以交给单独的控制器文件来承担。主要负责给组件提供数据。

目录结构（复杂项目）：

```
src/
├── controllers/
│   ├── HomeController.js
│   ├── DetailController.js
│   └── ProfileController.js
```

**HomeController.js**: 主页控制器。
**DetailController.js**: 详情页控制器。

控制层主要工作内容：

1. 提供数据给组件。
    - 组件调用控制器内的方法请求数据，控制器得到数据后返回给组件使用（推荐使用 async/await）。
    - 组件关联 store，在组件内通知控制器发起数据请求，控制器得到数据后通过 dispatch 修改 store 内的数据，组件通过 Redux
      机制获取数据。
2. 数据来源：
    - 网络请求。
    - 原生模块数据（通过 bridge 与原生交互）。
    - 组件请求时传递的参数，解析后返回。

#### 4. 数据层（Data）

负责提供项目的数据。

目录结构：

```
src/
├── api/
│   ├── apiConfig.js
│   └── apiEndpoints.js
├── store/
│   ├── index.js
│   ├── rootReducer.js
│   ├── actions/
│   │   ├── authActions.js
│   │   └── bookActions.js
│   └── reducers/
│       ├── authReducer.js
│       └── bookReducer.js
```

**apiConfig.js**: 配置所有的 URL 信息，debug/release 对应的 URL 切换。
**apiEndpoints.js**: 定义具体的网络请求实现。
**store/index.js**: Redux store 配置。
**actions/**: 定义所有的 Redux actions。
**reducers/**: 定义所有的 Redux reducers。

---

以上是详细的项目目录结构文档，根据您的需求和项目复杂度进行相应的调整和扩展。
