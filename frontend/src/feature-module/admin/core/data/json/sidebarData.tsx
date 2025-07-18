import { all_routes } from "../../../../router/all_routes";
const route = all_routes;
export const SidebarData = [
 
  {
    label: "Main",
    icon: "ti ti-page-break",
    submenu: true,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Dashboard",
        link: route.dashboard,
        showSubRoute: false,
        icon: "ti ti-layout-dashboard",
      },
      {
        label: "Users",
        icon: "ti ti-user",
        submenu: true,
        submenuItems: [
          { label: "Users List", link: route.users,icon:"ti ti-point-filled me-2" },
          { label: "Blocked Users", link: route.blockuser,icon:"ti ti-point-filled me-2" },
          { label: "Reported Users", link: route.reportuser,icon:"ti ti-point-filled me-2" },
          { label: "Invited Users", link: route.inviteuser,icon:"ti ti-point-filled me-2" },
        ],
      },
      {
        label: "Group",
        link:route.group,
        showSubRoute: false,
        icon: "ti ti-users-group",
      },
      {
        label: "Chat",
        link:route.chats,
        showSubRoute: false,
        icon: "ti ti-message-circle",
      },
      {
        label: "Calls",
        link: route.calls,
        showSubRoute: false,
        icon: "ti ti-phone-call",
      },
      {
        label: "Abuse Messages",
        link:route.abusemessage,
        showSubRoute: false,
        icon: "ti ti-message-report",
      },
      {
        label: "Stories",
        link: route.stories,
        showSubRoute: false,
        icon: "ti ti-circle-dot",
      },
      {
        label: "Settings",
        link: route.profileSettings,
        showSubRoute: false,
        icon: "ti ti-settings",
      },
     
    ],
  },


  {
    label: "UI Interface",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "UI Interface",
    submenuItems: [
      {
        label: "Base UI",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-hierarchy-2",
        submenuItems: [
          { label: "Alerts", link: route.alert, showSubRoute: false },
          { label: "Accordion", link: route.accordion, showSubRoute: false },
          { label: "Avatar", link: route.avatar, showSubRoute: false },
          { label: "Badges", link: route.uiBadges, showSubRoute: false },
          { label: "Border", link: route.border, showSubRoute: false },
          { label: "Buttons", link: route.button, showSubRoute: false },
          {
            label: "Button Group",
            link: route.buttonGroup,
            showSubRoute: false,
          },
          { label: "Breadcrumb", link: route.breadcrums, showSubRoute: false },
          { label: "Card", link: route.cards, showSubRoute: false },
          { label: "Carousel", link: route.carousel, showSubRoute: false },
          { label: "Colors", link: route.colors, showSubRoute: false },
          { label: "Dropdowns", link: route.dropdowns, showSubRoute: false },
          { label: "Grid", link: route.grid, showSubRoute: false },
          { label: "Images", link: route.images, showSubRoute: false },
          { label: "Lightbox", link:route.lightbox, showSubRoute: false },
          { label: "Media", link: route.media, showSubRoute: false },
          { label: "Modals", link: route.modals, showSubRoute: false },
          { label: "Offcanvas", link: route.offcanvas, showSubRoute: false },
          { label: "Pagination", link: route.pagination, showSubRoute: false },
          { label: "Popovers", link: route.popover, showSubRoute: false },
          { label: "Progress", link:route.progress, showSubRoute: false },
          {
            label: "Placeholders",
            link: route.placeholder,
            showSubRoute: false,
          },
          {
            label: "Range Slider",
            link: route.rangeSlider,
            showSubRoute: false,
          },
          { label: "Spinner", link: route.spinner, showSubRoute: false },
          {
            label: "Sweet Alerts",
            link: route.sweetalert,
            showSubRoute: false,
          },
          { label: "Tabs", link: route.navTabs, showSubRoute: false },
          { label: "Toasts", link: route.toasts, showSubRoute: false },
          { label: "Tooltips", link: route.tooltip, showSubRoute: false },
          { label: "Typography", link: route.typography, showSubRoute: false },
          { label: "Video", link: route.video, showSubRoute: false },
        ],
      },
      {
        label: "Advanced UI",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-hierarchy-3",
        submenuItems: [
          { label: "Ribbon", link: route.ribbon, showSubRoute: false },
          { label: "Clipboard", link: route.clipboard, showSubRoute: false },
          { label: "Drag & Drop", link: route.dragandDrop, showSubRoute: false },
          {
            label: "Range Slider",
            link: route.rangeSlider,
            showSubRoute: false,
          },
          { label: "Rating", link: route.rating, showSubRoute: false },
          {
            label: "Text Editor",
            link: route.textEditor,
            showSubRoute: false,
          },
          { label: "Counter", link: route.counter, showSubRoute: false },
          { label: "Scrollbar", link: route.scrollBar, showSubRoute: false },
          { label: "Sticky Note", link:  route.stickyNotes, showSubRoute: false },
          { label: "Timeline", link: route.timeLine, showSubRoute: false },
        ],
      },
      {
        label: "Charts",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-chart-line",
        submenuItems: [
          { label: "Apex Charts", link: route.apexChat, showSubRoute: false },
          { label: "Chart Js", link: route.chart, showSubRoute: false },
        ],
      },
      {
        label: "Icons",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-icons",
        submenuItems: [
          {
            label: "Fontawesome Icons",
            link: route.fantawesome,
            showSubRoute: false,
          },
          {
            label: "Feather Icons",
            link: route.featherIcons,
            showSubRoute: false,
          },
          { label: "Ionic Icons", link: route.iconicIcon, showSubRoute: false },
          {
            label: "Material Icons",
            link: route.materialIcon,
            showSubRoute: false,
          },
          { label: "Pe7 Icons", link: route.pe7icon, showSubRoute: false },
          {
            label: "Simpleline Icons",
            link: route.simpleLineIcon,
            showSubRoute: false,
          },
          {
            label: "Themify Icons",
            link: route.themifyIcon,
            showSubRoute: false,
          },
          {
            label: "Weather Icons",
            link: route.weatherIcon,
            showSubRoute: false,
          },
          {
            label: "Typicon Icons",
            link: route.typicon,
            showSubRoute: false,
          },
          { label: "Flag Icons", link: route.falgIcons, showSubRoute: false },
        ],
      },
      {
        label: "Forms",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-input-search",
        submenuItems: [
          {
            label: "Form Elements",
            submenu: true,
            submenu2: true,
            showSubRoute: false,
            submenuItems: [
              {
                label: "Basic Inputs",
                link: route.basicInput,
                showSubRoute: false,
              },
              {
                label: "Checkbox & Radios",
                link: route.checkboxandRadion,
                showSubRoute: false,
              },
              {
                label: "Input Groups",
                link:  route.inputGroup,
                showSubRoute: false,
              },
              {
                label: "Grid & Gutters",
                link:  route.gridandGutters,
                showSubRoute: false,
              },
              {
                label: "Form Select",
                link:  route.formSelect,
                showSubRoute: false,
              },
              { label: "Input Masks", link: route.formMask, showSubRoute: false },
              {
                label: "File Uploads",
                link: route.fileUpload,
                showSubRoute: false,
              },
            ],
          },
          {
            label: "Layouts",
            submenu: true,
            submenu2: true,
            showSubRoute: false,
            submenuItems: [
              { label: "Horizontal Form", link: route.horizontalForm },
              { label: "Vertical Form", link: route.verticalForm },
              { label: "Floating Labels", link: route.floatingLable },
            ],
          },
          { label: "Form Validation", link: route.formValidation },
          { label: "Select", link: route.reactSelect },
          { label: "Form Wizard", link: route.formWizard },
        ],
      },
      {
        label: "Tables",
        submenu: true,
        showSubRoute: false,
        icon: "ti ti-table-plus",
        submenuItems: [
          { label: "Basic Tables", link: route.tableBasic },
          { label: "Data Table", link: route.dataTable },
        ],
      },
    ],
  },
  {
    label: "Help",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Help",
    submenuItems: [
      {
        label: "Documentation",
        link: "#",
        icon: "ti ti-file-text",
        showSubRoute: false,
        version:"4.0.2",
        vshow:true
      },
      {
        label: "Changelog",
        link: "#",
        icon: "ti ti ti-exchange",
        showSubRoute: false,

      },
      {
        label: "Multi Level",
        showSubRoute: false,
        submenu: true,
        icon: "ti ti-menu-2",
        submenuItems: [
          { label: "Level 1.1", link: "#", showSubRoute: false },
          {
            label: "Level 1.2",
            submenu: true,
            showSubRoute: false,
            submenuItems: [
              { label: "Level 2.1", link: "#", showSubRoute: false },
              {
                label: "Level 2.2",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Level 3.1", link: "#", showSubRoute: false },
                  { label: "Level 3.2", link: "#", showSubRoute: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
