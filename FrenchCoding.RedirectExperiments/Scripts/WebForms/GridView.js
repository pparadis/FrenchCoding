function GridView() {
    this.pageIndex = null;
    this.sortExpression = null;
    this.sortDirection = null;
    this.dataKeys = null;
    this.createPropertyString = GridView_createPropertyString;
    this.setStateField = GridView_setStateValue;
    this.getHiddenFieldContents = GridView_getHiddenFieldContents;
    this.stateField = null;
    this.panelElement = null;
    this.callback = null;
}
function GridView_createPropertyString() {
    return createPropertyStringFromValues_GridView(this.pageIndex, this.sortDirection, this.sortExpression, this.dataKeys);
}
function GridView_setStateValue() {
    this.stateField.value = this.createPropertyString();
}
function GridView_OnCallback(n,t){for(var f=new String(n),i=f.split("|"),u=i[4],r=5;r<i.length;r++)u+="|"+i[r];t.panelElement.innerHTML=u,t.stateField.value=createPropertyStringFromValues_GridView(i[0],i[1],i[2],i[3])}function GridView_getHiddenFieldContents(arg) {
    return arg + "|" + this.stateField.value;
}
function createPropertyStringFromValues_GridView(pageIndex, sortDirection, sortExpression, dataKeys) {
    var value = new Array(pageIndex, sortDirection, sortExpression, dataKeys);
    return value.join("|");
}
