//import { parseHTML } from './html-parser';
import { parseString } from 'xml2js'


const template = `<View>
    <Sprite x="11" y="12">
        2
        <!-- <TextField x="11" y="12">{{scenes}}</TextField> -->
        <TextField x="11" y="11">{{scenes}}</TextField>
        <TextField x="11" y="12">{{scenes}}</TextField>
    </Sprite>
    <Sprite1 x="11" y="12">
        1
        <TextField x="11" y="13" />
        <TextField x="11" y="14">{{scenes}}</TextField>
    </Sprite1>
    <Sprite x="11" y="12">
        1
        <TextField x="11" y="15">{{scenes}}</TextField>
        <TextField x="11" y="16">{{scenes}}</TextField>
    </Sprite>
</View>`

/* const root = parseHTML(template, {
    startElement: function(tagName, attrs){
        
    },
    endElement: function(tagName){

    },
    characters: function(text){

    },
    comment: function(text){

    },
}) */
const view = parseString(template, {
    trim: true,
    charkey: 'text',
    attrkey: 'attrs',
    childkey: 'children',
    explicitRoot: false,
    explicitChildren: true,
    preserveChildrenOrder: true,
}, (err, xml) => {
    debugger;
    console.log(xml.children)
    //console.log(root)
    //Object.keys(xml.Root).forEach(key => this._render(key, this))
})