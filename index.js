const template = document.createElement("template");
template.innerHTML = `
    <style>
        .form-element{
            position: relative;
            height: 51px;  
        }
        .form-element input{
            background: gold;
            bottom: 0;
            height: 70%;
            width: 300px;
            padding-left: 10px;
            padding-right: 0;
            border: none;
            background-color: transparent;
            padding-top: 12px;
            padding-bottom: 0;
            outline-width: 0;
            border: 1px solid #000;
            border-radius: 2px;
        }
        .form-element label{
            position: absolute;
            opacity: 0.8;
            z-index: 1;
            top: 50%;
            left: 0;
            transform: translate(10px, -50%);
            transition: opacity .1s cubic-bezier(0, 0, 0, 0.3 ), transform .1s cubic-bezier(0, 0, 0, 0.3 );
        }
        .input-with-value + label, .form-element input:focus +label{
            transform: scale(.8) translate(10px, -150%)!important;
            transform-origin: top left;
            opacity: 0.6;
        
        }
        .form-element input[required] + label::after{
            content: "*";
            padding-left: 4px;
            color: red;
            font-size: 1rem;
        }
    </style>
    
    <div class="form-element">
        <input id="out" >
        <label class="input-label"></label>
    </div>
    
    
`



class mytagInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('label').innerText = this.getAttribute('label');

    }


    outHandler() {
        evt = this.shadowRoot.evt;
        const onInputHandler = ()=>{
            const value = this.shadowRoot.evt.target.value;
            if(value != "") this.shadowRoot.evt.target.classList.add("input-with-value");
            else this.shadowRoot.evt.target.classList.remove("input-with-value");
        }
        const formInputElements = this.shadowRoot.querySelectorAll("#out");
        formInputElements.forEach(elt=>{
            elt.oninput = onInputHandler;
        });
    }


    connectedCallback() {
        this.outHandler();
    }

    


}

window.customElements.define("mytag-input", mytagInput);
