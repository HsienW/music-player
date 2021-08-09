const sideBarStyle = `
 .side-bar {
            background: #ffffff;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            border-right: 1px solid #d9d9d9;
        }
        
        .side-bar ul {
            padding: 10px;
            margin: 0;
        }
        
        .side-bar i {
            margin-right: 10px;
        }
        
        .side-bar li {
            cursor:pointer;
            list-style-type: none;
        }
        
        .side-bar ul li a {
            color: #8c8c8c
            text-decoration: none;
            font-size: 14px;
            display: block;
            padding: 12px 15px;
            transition: all 0.15s;
            position: relative;
        }
        
        .side-bar>ul.side-bar-menu>li.active>a,
        .side-bar>ul>li>ul.side-bar-menu>li.active>a,
        .side-bar>ul>li>ul>li>ul.side-bar-menu>li.active>a,
        .side-bar>ul>li>ul>li>ul>li>ul.side-bar-menu>li.active>a,
        .side-bar>ul>li>ul>li>ul>li>ul>li>ul.side-bar-menu>li.active>a {
            background-color: #e6f7ff;
            color: #1890ff;
        }
        
        .side-bar>ul>li>ul,
        .side-bar>ul>li>ul>li>ul,
        .side-bar>ul>li>ul>li>ul>li>ul,
        .side-bar>ul>li>ul>li>ul>li>ul>li>ul {
            display: none;
        }
        
        .side-bar>ul>li.active>ul.side-bar-menu,
        .side-bar>ul>li>ul>li.active>ul.side-bar-menu,
        .side-bar>ul>li>ul>li>ul>li.active>ul.side-bar-menu,
        .side-bar>ul>li>ul>li>ul>li>ul>li.active>ul.side-bar-menu {
            display: block;
        }
        
        .side-bar>ul>li>ul,
        .side-bar>ul>li>ul>li>ul,
        .side-bar>ul>li>ul>li>ul>li>ul,
        .side-bar>ul>li>ul>li>ul>li>ul>li>ul {
            padding-left: 20px;
        }
        
        .side-bar a:not(:only-child):after {
            content: "\\f105";
            position: absolute;
            right: 20px;
            top: 14px;
            font-size: 14px;
            display: inline-block;
            padding-right: 3px;
            vertical-align: middle;
            font-weight: 900;
            transition: 0.15s;
        }
        
        .side-bar .active>a:not(:only-child):after {
            transform: rotate(90deg);
        }
        
        .side-bar::-webkit-scrollbar {
            width: 5px;
            height: 8px;
        }
        
        .side-bar::-webkit-scrollbar-track {
            border-radius: 10px;
            background-color: #e4e4e4;
        }
        
        .side-bar::-webkit-scrollbar-thumb {
            background: #0089ff;
            border-radius: 10px;
            transition: 0.15s;
        }
        
        .side-bar::-webkit-scrollbar-thumb:hover {
            background: #d5b14c;
            transition: 0.15s;
        }
`
export {
    sideBarStyle
}
