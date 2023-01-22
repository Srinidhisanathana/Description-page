
class Detail 
{
    constructor(name,imglist,desc)
    {
        this.name = name;
        this.imglist = imglist;
        this.desc = desc;

        this.custom_event_function = this.custom_event_function.bind(this);
    }
    custom_event_function()
    {   
        const event = new Event('CustomEvent');
        event.detail = {'imglist':this.imglist,'desc':this.desc}
        document.dispatchEvent(event); 
    }
}
class App_Detail
{
    constructor()
    {
        this.entitylist = [];
        this.get_json = this.get_json.bind(this);
        this._render_the_names = this._render_the_names.bind(this);
        this._render_the_images = this._render_the_images.bind(this);
        document.addEventListener('CustomEvent',this._render_the_images);
    }
    get_json(json)
    {
        const elist = json;
        for(const item of elist)
        {
            const ent = new Detail(item.entity,item.images,item.Desc,this._render_the_images);
            this.entitylist.push(ent);
        }
        this._render_the_names();
    }
    get_the_entities()
    {
        fetch("./index.json").then((response)=>response.json()).then(this.get_json);
    }

    _render_the_names()
    {
        const entitycontainer = document.querySelector("#modle");
        for(const ent of this.entitylist)
        {
            const paraEn = document.createElement("li");
            paraEn.textContent = ent.name;
            paraEn.style.listStyleType = "none";
            paraEn.style.color = "red";
            paraEn.style.fontSize = "15px";
            paraEn.style.cursor = "pointer";
            paraEn.addEventListener('click',ent.custom_event_function);

            entitycontainer.appendChild(paraEn);
        }
    }
    _render_the_images(event)
    {
        const imagecontainer = document.querySelector("#imagelist");
        const descriptioncontainer = document.querySelector(".desc");
        imagecontainer.innerHTML = "";
        descriptioncontainer.innerHTML ="";
        const images = event.detail.imglist;
        const descriptions = event.detail.desc;
        for(const src in images)
        {
            const img = document.createElement("img");
            img.src = images[src];
            img.height=220;
            img.width=220;
            img.style.padding="20px";
            img.style.cursor="pointer";
            img.dataset.descriptor = descriptions[src];
            img.addEventListener('click',this._render_the_description)
            imagecontainer.appendChild(img);
        }
    }
    _render_the_description(event)
    {
        const descriptioncontainer = document.querySelector(".desc");
        descriptioncontainer.innerHTML = "";
        const val = event.currentTarget.dataset.descriptor;   
        const paraEn = document.createElement("p");
        paraEn.textContent = val;
        descriptioncontainer.appendChild(paraEn); 
    }
 
}
const app = new App_Detail();
app.get_the_entities();