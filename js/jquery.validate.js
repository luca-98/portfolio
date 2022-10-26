/*
 jQuery Validation Plugin v1.17.0

 https://jqueryvalidation.org/

 Copyright (c) 2017 Jrn Zaefferer
 Released under the MIT license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(c,m,l){c instanceof String&&(c=String(c));for(var a=c.length,b=0;b<a;b++){var d=c[b];if(m.call(l,d,b,c))return{i:b,v:d}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,m,l){c!=Array.prototype&&c!=Object.prototype&&(c[m]=l.value)};
$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(c,m,l,a){if(m){l=$jscomp.global;c=c.split(".");for(a=0;a<c.length-1;a++){var b=c[a];b in l||(l[b]={});l=l[b]}c=c[c.length-1];a=l[c];m=m(a);m!=a&&null!=m&&$jscomp.defineProperty(l,c,{configurable:!0,writable:!0,value:m})}};
$jscomp.polyfill("Array.prototype.find",function(c){return c?c:function(c,l){return $jscomp.findInternal(this,c,l).v}},"es6","es3");
!function(c){"function"==typeof define&&define.amd?define(["jquery"],c):"object"==typeof module&&module.exports?module.exports=c(require("jquery")):c(jQuery)}(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");return b||(this.attr("novalidate","novalidate"),b=new c.validator(a,this[0]),c.data(this[0],"validator",b),b.settings.onsubmit&&(this.on("click.validate",":submit",function(a){b.submitButton=a.currentTarget;c(this).hasClass("cancel")&&(b.cancelSubmit=
!0);void 0!==c(this).attr("formnovalidate")&&(b.cancelSubmit=!0)}),this.on("submit.validate",function(a){function d(){var d,e;return b.submitButton&&(b.settings.submitHandler||b.formSubmitted)&&(d=c("\x3cinput type\x3d'hidden'/\x3e").attr("name",b.submitButton.name).val(c(b.submitButton).val()).appendTo(b.currentForm)),!b.settings.submitHandler||(e=b.settings.submitHandler.call(b,b.currentForm,a),d&&d.remove(),void 0!==e&&e)}return b.settings.debug&&a.preventDefault(),b.cancelSubmit?(b.cancelSubmit=
!1,d()):b.form()?b.pendingRequest?(b.formSubmitted=!0,!1):d():(b.focusInvalid(),!1)})),b)}a&&a.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var a,b,d;return c(this[0]).is("form")?a=this.validate().form():(d=[],a=!0,b=c(this[0].form).validate(),this.each(function(){(a=b.element(this)&&a)||(d=d.concat(b.errorList))}),b.errorList=d),a},rules:function(a,b){var d,e,f,k,g,n,h=this[0];if(null!=h&&(!h.form&&h.hasAttribute("contenteditable")&&
(h.form=this.closest("form")[0],h.name=this.attr("name")),null!=h.form)){if(a)switch(e=(d=c.data(h.form,"validator").settings).rules,f=c.validator.staticRules(h),a){case "add":c.extend(f,c.validator.normalizeRule(b));delete f.messages;e[h.name]=f;b.messages&&(d.messages[h.name]=c.extend(d.messages[h.name],b.messages));break;case "remove":return b?(n={},c.each(b.split(/\s/),function(a,b){n[b]=f[b];delete f[b]}),n):(delete e[h.name],f)}return(k=c.validator.normalizeRules(c.extend({},c.validator.classRules(h),
c.validator.attributeRules(h),c.validator.dataRules(h),c.validator.staticRules(h)),h)).required&&(g=k.required,delete k.required,k=c.extend({required:g},k)),k.remote&&(g=k.remote,delete k.remote,k=c.extend(k,{remote:g})),k}}});c.extend(c.expr.pseudos||c.expr[":"],{blank:function(a){return!c.trim(""+c(a).val())},filled:function(a){a=c(a).val();return null!==a&&!!c.trim(""+a)},unchecked:function(a){return!c(a).prop("checked")}});c.validator=function(a,b){this.settings=c.extend(!0,{},c.validator.defaults,
a);this.currentForm=b;this.init()};c.validator.format=function(a,b){return 1===arguments.length?function(){var b=c.makeArray(arguments);return b.unshift(a),c.validator.format.apply(this,b)}:(void 0===b||(2<arguments.length&&b.constructor!==Array&&(b=c.makeArray(arguments).slice(1)),b.constructor!==Array&&(b=[b]),c.each(b,function(b,c){a=a.replace(new RegExp("\\{"+b+"\\}","g"),function(){return c})})),a)};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",
validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a;this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,
b){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===b.which&&""===this.elementValue(a)||-1!==c.inArray(b.keyCode,d)||(a.name in this.submitted||a.name in this.invalid)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){"radio"===a.type?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){"radio"===a.type?this.findByName(a.name).removeClass(b).addClass(d):
c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}."),step:c.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function a(a){!this.form&&
this.hasAttribute("contenteditable")&&(this.form=c(this).closest("form")[0],this.name=c(this).attr("name"));var b=c.data(this.form,"validator"),d="on"+a.type.replace(/^validate/,""),e=b.settings;e[d]&&!c(this).is(e.ignore)&&e[d].call(b,this,a)}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache=
{};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(a,d){"string"==typeof d&&(d=d.split(/\s/));c.each(d,function(c,d){b[d]=a})});var d=this.settings.rules;c.each(d,function(a,b){d[a]=c.validator.normalizeRule(b)});c(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type\x3d'password'], [type\x3d'file'], select, textarea, [type\x3d'number'], [type\x3d'search'], [type\x3d'tel'], [type\x3d'url'], [type\x3d'email'], [type\x3d'datetime'], [type\x3d'date'], [type\x3d'month'], [type\x3d'week'], [type\x3d'time'], [type\x3d'datetime-local'], [type\x3d'range'], [type\x3d'color'], [type\x3d'radio'], [type\x3d'checkbox'], [contenteditable], [type\x3d'button']",
a).on("click.validate","select, option, [type\x3d'radio'], [type\x3d'checkbox']",a);this.settings.invalidHandler&&c(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),c.extend(this.submitted,this.errorMap),this.invalid=c.extend({},this.errorMap),this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);
return this.valid()},element:function(a){var b,d,e=this.clean(a),f=this.validationTargetFor(e),k=this,g=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=c(f),(d=this.groups[f.name])&&c.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=k.validationTargetFor(k.clean(k.findByName(a))))&&e.name in k.invalid&&(k.currentElements.push(e),g=k.check(e)&&g)}),b=!1!==this.check(f),g=g&&b,this.invalid[f.name]=!b,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),
this.showErrors(),c(a).attr("aria-invalid",!b)),g},showErrors:function(a){if(a){var b=this;c.extend(this.errorMap,a);this.errorList=c.map(this.errorMap,function(a,c){return{message:a,element:b.findByName(c)[0]}});this.successList=c.grep(this.successList,function(b){return!(b.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.invalid={};this.submitted=
{};this.prepareForm();this.hideErrors();var a=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(a)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},
objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&!1!==a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text("");this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},
findLastActive:function(){var a=this.lastActive;return a&&1===c.grep(this.errorList,function(b){return b.element.name===a.name}).length&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||c(this).attr("name");return!d&&a.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&
(this.form=c(this).closest("form")[0],this.name=d),!(d in b||!a.objectLength(c(this).rules())||(b[d]=!0,0))})},clean:function(a){return c(a)[0]},errors:function(){var a=this.settings.errorClass.split(" ").join(".");return c(this.settings.errorElement+"."+a,this.errorContext)},resetInternals:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([])},reset:function(){this.resetInternals();this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=
this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},elementValue:function(a){var b,d,e=c(a),f=a.type;return"radio"===f||"checkbox"===f?this.findByName(a.name).filter(":checked").val():"number"===f&&void 0!==a.validity?a.validity.badInput?"NaN":e.val():(b=a.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===b.substr(0,12)?b.substr(12):0<=(d=b.lastIndexOf("/"))||0<=(d=b.lastIndexOf("\\"))?b.substr(d+1):b:"string"==typeof b?
b.replace(/\r/g,""):b)},check:function(a){a=this.validationTargetFor(this.clean(a));var b,d,e,f=c(a).rules(),k=c.map(f,function(a,b){return b}).length,g=!1,n=this.elementValue(a);if("function"==typeof f.normalizer?e=f.normalizer:"function"==typeof this.settings.normalizer&&(e=this.settings.normalizer),e){if("string"!=typeof(n=e.call(a,n)))throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if("dependency-mismatch"===
(b=c.validator.methods[d].call(this,n,a,e.parameters))&&1===k)g=!0;else{if(g=!1,"pending"===b)return void(this.toHide=this.toHide.not(this.errorsFor(a)));if(!b)return this.formatAndAdd(a,e),!1}}catch(h){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+a.id+", check the '"+e.method+"' method.",h),h instanceof TypeError&&(h.message+=".  Exception occurred when checking element "+a.id+", check the '"+e.method+"' method."),h;}}if(!g)return this.objectLength(f)&&
this.successList.push(a),!0},customDataMessage:function(a,b){return c(a).data("msg"+b.charAt(0).toUpperCase()+b.substring(1).toLowerCase())||c(a).data("msg")},customMessage:function(a,b){return(a=this.settings.messages[a])&&(a.constructor===String?a:a[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(a,b){"string"==typeof b&&(b={method:b});var d=this.findDefined(this.customMessage(a.name,b.method),this.customDataMessage(a,
b.method),!this.settings.ignoreTitle&&a.title||void 0,c.validator.messages[b.method],"\x3cstrong\x3eWarning: No message defined for "+a.name+"\x3c/strong\x3e"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,b.parameters,a):e.test(d)&&(d=c.validator.format(d.replace(e,"{$1}"),b.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method});this.errorMap[a.name]=c;this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&
(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a;for(a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,
b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d,e,f,k,g=this.errorsFor(a),n=this.idOrName(a),h=c(a).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
g.html(b)):(d=g=c("\x3c"+this.settings.errorElement+"\x3e").attr("id",n+"-error").addClass(this.settings.errorClass).html(b||""),this.settings.wrapper&&(d=g.hide().show().wrap("\x3c"+this.settings.wrapper+"/\x3e").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,c(a)):d.insertAfter(a),g.is("label")?g.attr("for",n):0===g.parents("label[for\x3d'"+this.escapeCssMeta(n)+"']").length&&(f=g.attr("id"),h?h.match(new RegExp("\\b"+
this.escapeCssMeta(f)+"\\b"))||(h+=" "+f):h=f,c(a).attr("aria-describedby",h),(e=this.groups[a.name])&&(k=this,c.each(k.groups,function(a,b){b===e&&c("[name\x3d'"+k.escapeCssMeta(a)+"']",k.currentForm).attr("aria-describedby",g.attr("id"))}))));!b&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,a));this.toShow=this.toShow.add(g)},errorsFor:function(a){var b=this.escapeCssMeta(this.idOrName(a));a=c(a).attr("aria-describedby");
b="label[for\x3d'"+b+"'], label[for\x3d'"+b+"'] *";return a&&(b=b+", #"+this.escapeCssMeta(a).replace(/\s+/g,", #")),this.errors().filter(b)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name)),c(a).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},
findByName:function(a){return c(this.currentForm).find("[name\x3d'"+this.escapeCssMeta(a)+"']")},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{boolean:function(a){return a},string:function(a,b){return!!c(a,b.form).length},function:function(a,
b){return a(b)}},optional:function(a){var b=this.elementValue(a);return!c.validator.methods.required.call(this,b,a)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,c(a).addClass(this.settings.pendingClass),this.pending[a.name]=!0)},stopRequest:function(a,b){this.pendingRequest--;0>this.pendingRequest&&(this.pendingRequest=0);delete this.pending[a.name];c(a).removeClass(this.settings.pendingClass);b&&0===this.pendingRequest&&this.formSubmitted&&this.form()?
(c(this.currentForm).submit(),this.submitButton&&c("input:hidden[name\x3d'"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!b&&0===this.pendingRequest&&this.formSubmitted&&(c(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(a,b){return b="string"==typeof b&&b||"remote",c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:!0,message:this.defaultMessage(a,{method:b})})},destroy:function(){this.resetForm();
c(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(a,b){a.constructor===String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,a)},classRules:function(a){var b={};a=c(a).attr("class");return a&&
c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])}),b},normalizeAttributeRule:function(a,b,c,e){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(e=Number(e),isNaN(e)&&(e=void 0));e||0===e?a[c]=e:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(a){var b,d,e={},f=c(a),k=a.getAttribute("type");for(b in c.validator.methods)"required"===b?(""===(d=a.getAttribute(b))&&(d=!0),d=!!d):d=f.attr(b),this.normalizeAttributeRule(e,
k,b,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(a){var b,d={},e=c(a),f=a.getAttribute("type");for(b in c.validator.methods)a=e.data("rule"+b.charAt(0).toUpperCase()+b.substring(1).toLowerCase()),this.normalizeAttributeRule(d,f,b,a);return d},staticRules:function(a){var b={},d=c.data(a.form,"validator");return d.settings.rules&&(b=c.validator.normalizeRule(d.settings.rules[a.name])||{}),b},normalizeRules:function(a,b){return c.each(a,function(d,
e){if(!1!==e){if(e.param||e.depends){var f=!0;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}f?a[d]=void 0===e.param||e.param:(c.data(b.form,"validator").resetElements(c(b)),delete a[d])}}else delete a[d]}),c.each(a,function(d,e){a[d]=c.isFunction(e)&&"normalizer"!==d?e(b):e}),c.each(["minlength","maxlength"],function(){a[this]&&(a[this]=Number(a[this]))}),c.each(["rangelength","range"],function(){var b;a[this]&&(c.isArray(a[this])?
a[this]=[Number(a[this][0]),Number(a[this][1])]:"string"==typeof a[this]&&(b=a[this].replace(/[\[\]]/g,"").split(/[\s,]+/),a[this]=[Number(b[0]),Number(b[1])]))}),c.validator.autoCreateRanges&&(null!=a.min&&null!=a.max&&(a.range=[a.min,a.max],delete a.min,delete a.max),null!=a.minlength&&null!=a.maxlength&&(a.rangelength=[a.minlength,a.maxlength],delete a.minlength,delete a.maxlength)),a},normalizeRule:function(a){if("string"==typeof a){var b={};c.each(a.split(/\s/),function(){b[this]=!0});a=b}return a},
addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=void 0!==d?d:c.validator.messages[a];3>b.length&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){return this.depend(d,b)?"select"===b.nodeName.toLowerCase()?(a=c(b).val())&&0<a.length:this.checkable(b)?0<this.getLength(a,b):0<a.length:"dependency-mismatch"},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},
url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test((new Date(a)).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(a,b,d){a=c.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||a>=d},maxlength:function(a,b,d){a=
c.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||a<=d},rangelength:function(a,b,d){a=c.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(a,b,d){var e,f=c(b).attr("type"),k="Step attribute on input type "+f+" is not supported.",g=["text","number","range"],n=new RegExp("\\b"+
f+"\\b"),h=function(a){return(a=(""+a).match(/(?:\.(\d+))?$/))&&a[1]?a[1].length:0},l=!0;if(f&&!n.test(g.join()))throw Error(k);return e=h(d),(h(a)>e||0!=Math.round(a*Math.pow(10,e))%Math.round(d*Math.pow(10,e)))&&(l=!1),this.optional(b)||l},equalTo:function(a,b,d){d=c(d);return this.settings.onfocusout&&d.not(".validate-equalTo-blur").length&&d.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){c(b).valid()}),a===d.val()},remote:function(a,b,d,e){if(this.optional(b))return"dependency-mismatch";
e="string"==typeof e&&e||"remote";var f,k,g,l=this.previousValue(b,e);return this.settings.messages[b.name]||(this.settings.messages[b.name]={}),l.originalMessage=l.originalMessage||this.settings.messages[b.name][e],this.settings.messages[b.name][e]=l.message,d="string"==typeof d&&{url:d}||d,g=c.param(c.extend({data:a},d.data)),l.old===g?l.valid:(l.old=g,f=this,this.startRequest(b),(k={})[b.name]=a,c.ajax(c.extend(!0,{mode:"abort",port:"validate"+b.name,dataType:"json",data:k,context:f.currentForm,
success:function(c){var d,g,k,h=!0===c||"true"===c;f.settings.messages[b.name][e]=l.originalMessage;h?(k=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(b),f.formSubmitted=k,f.successList.push(b),f.invalid[b.name]=!1,f.showErrors()):(d={},g=c||f.defaultMessage(b,{method:e,parameters:a}),d[b.name]=l.message=g,f.invalid[b.name]=!0,f.showErrors(d));l.valid=h;f.stopRequest(b,h)}},d)),"pending")}}});var m,l={};return c.ajaxPrefilter?c.ajaxPrefilter(function(a,b,c){b=a.port;"abort"===a.mode&&(l[b]&&
l[b].abort(),l[b]=c)}):(m=c.ajax,c.ajax=function(a){var b=("port"in a?a:c.ajaxSettings).port;return"abort"===("mode"in a?a:c.ajaxSettings).mode?(l[b]&&l[b].abort(),l[b]=m.apply(this,arguments),l[b]):m.apply(this,arguments)}),c});