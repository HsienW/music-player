const headerBarStyle = `
   .hidden {
        display: none;
   }
        
   .header-bar {
        background: #ffffff;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        outline: 1px solid #d9d9d9;
   }
        
   .logo-area {
        width: 250px;
        display: flex;
        justify-content: center;
        align-content: center;
   }
        
   .logo-text {
        align-self: center;
        font-weight: 700;
        font-size: 30px;
        color: #595959;
   }
        
   .user-info-area {
        width: 16%;
        min-width: 250px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
   }
        
   .user-info-area>.user-name,
   .user-info-area>.user-image {
        align-self: center;
   }
        
   .user-image {
        width: 40px;
        height: 40px;
   }
        
   .user-name {
        max-width: 60%;
        margin-left: 10px;
        overflow : hidden;
        text-overflow : ellipsis;
        white-space : nowrap;
        color: #595959;
        font-size: 16px;
   }
        
   .user-setting-icon {
        width: 16px;
        height: 14px;
        cursor: pointer;
        padding: 4px 10px 0;
        filter: invert(33%) sepia(3%) saturate(0%) hue-rotate(339deg) brightness(93%) contrast(79%);
   }
        
   .user-setting-dropdown {
        display: inline-block;
        position: relative;
        font-size: 14px;
        color: #8c8c8c;
        z-index: 4;
   }
        
   .user-setting-dropdown>.button {
        display: inline-block;
        white-space: nowrap;
   }
        
   .user-setting-dropdown>.button:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
   }
        
   .user-setting-dropdown>.menu {
        position: absolute;
        top: 100%;
        border: 1px solid #d9d9d9;
        padding: 0;
        margin: 2px 0 0 0;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12);
        background-color: #ffffff;
        border-radius: 2px;
        list-style-type: none;
        right: 0%;
   }
        
   .user-setting-dropdown>.menu li {
        padding: 10px 20px;
        cursor: pointer;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
        align-content: center;
   }
        
   .user-setting-dropdown>.menu li:hover {
        background-color: #e6f7ff
   }
        
   .user-setting-dropdown>.menu li a {
        display: block;
        margin: -10px -20px;
        padding: 10px 20px;
   }
        
   .user-setting-dropdown>.menu li.divider{
        padding: 0;
        border-bottom: 1px solid #d9d9d9;
   }
   
   .icon {
        width: 16px;
        height: 16px;
        padding: 0 10px 0 0;
        filter: invert(33%) sepia(3%) saturate(0%) hue-rotate(339deg) brightness(93%) contrast(79%);
    }
`
export {
    headerBarStyle
}
