const authStyle = `
   .hidden {
        display: none;
   }
   
    .auth-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        width: 100%;
        height: 100%;
        background-color: rgba(51, 51, 51, 0.95);
    }
        
    .auth-page {
         width: 420px;
         padding: 8% 0 0;
         margin: auto;
         z-index: 99;
    }
        
    .form {
         font-family: 'Roboto', sans-serif;
         position: relative;
         z-index: 1;
         background: #FFFFFF;
         max-width: 420px;
         margin: 0 auto 0;
         padding: 45px;
         box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
         border-radius: 4px
    }
        
    .input {
         font-family: 'Roboto', sans-serif;
         outline: 0;
         background: #f2f2f2;
         width: 100%;
         border: 0;
         margin: 0 0 0.75rem;
         padding: 10px 15px;
         box-sizing: border-box;
         font-size: 0.75rem;
         border-radius: 4px
    }
        
    .button {
        text-transform: uppercase;
        outline: 0;
        background: #1890ff;
        width: 100%;
        border: 0;
        padding: 10px 15px;
        color: #FFFFFF;
        font-size: 0.8rem;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        border-radius: 4px
    }
        
    .form button:hover,.form button:active,.form button:focus {
        opacity: 0.8
    }
        
    .form .form-title {
        margin: 0 0 0.8rem 0;
        color: #595959;
        font-size: 1.75rem;
        font-weight: 700;
        text-align: center;
    }
        
    .form .form-sub-title {
         margin: 0.8rem; 0 0;
         color: #bfbfbf;
         font-size: 0.85rem;
    }
        
    .form .description {
         margin: 0.8rem; 0 0;
         color: #bfbfbf;
         font-size: 0.75rem;
         text-align: center;
    }
        
    .form .description a {
         color: #4CAF50;
         text-decoration: none;
    }
    
    .form .auth-text {
         text-align: center;
    }
        
    .container {
         position: relative;
         z-index: 1;
         max-width: 300px;
         margin: 0 auto;
    }
        
    .container:before, .container:after {
         content: '';
         display: block;
         clear: both;
    }
        
    .container .info {
         margin: 50px auto;
         text-align: center;
    }
        
    .container .info h1 {
         margin: 0 0 15px;
         padding: 0;
         font-size: 36px;
         font-weight: 300;
         color: #1a1a1a;
    }
        
    .container .info span {
         color: #4d4d4d;
         font-size: 12px;
    }
        
    .container .info span a {
         color: #000000;
         text-decoration: none;
    }
        
    .container .info span .fa {
         color: #EF3B3A;
    }
`
export {
    authStyle
}
