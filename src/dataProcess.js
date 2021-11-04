exports.search = function(list, searchName, searchTag) {
    var newList=[];
    var condiName=searchName;
    var condiTag=searchTag;
    if(((!condiName) || condiName.length==0) && ((!condiTag) || condiTag.length==0)) {
        return(list);
    }
    for(var i=0;i<list.length;i++) {
        var oneStudent=list[i];
        var passName=false;
        var passTag=false;
        if((!condiName) || condiName.length==0) {
            passName=true;
        } else {
            var fullName=oneStudent.firstName+" "+oneStudent.lastName;
            if(fullName.indexOf(condiName)!=-1)
                passName=true;
        }
        //If passName, then judge if passTag
        if(passName) {
            if((!condiTag) || condiTag.length==0) {
                passTag=true;
            } else {                
                if((!oneStudent.tag) || oneStudent.tag.length==0) {
                    passTag=false;
                } else {
                    for(var j=0;j<oneStudent.tag.length;j++) {
                        var oneTag=oneStudent.tag[j];
                        if(oneTag.indexOf(condiTag)!=-1) {
                            passTag=true;
                            break;
                        }
                    }
                }
            }
        }
        if(passName && passTag) {
            newList.push(oneStudent);
        }
    }
    return(newList);
}
