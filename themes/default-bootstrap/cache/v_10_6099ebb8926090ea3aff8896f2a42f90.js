;$(document).ready(function(){$('ul.tree.dhtml').hide();if(!$('ul.tree.dhtml').hasClass('dynamized'))
{$('ul.tree.dhtml ul').prev().before("<span class='grower OPEN'> </span>");$('ul.tree.dhtml ul li:last-child, ul.tree.dhtml li:last-child').addClass('last');$('ul.tree.dhtml span.grower.OPEN').addClass('CLOSE').removeClass('OPEN').parent().find('ul:first').hide();$('ul.tree.dhtml').show();$('ul.tree.dhtml .selected').parents().each(function(){if($(this).is('ul'))
toggleBranch($(this).prev().prev(),true);});toggleBranch($('ul.tree.dhtml .selected').prev(),true);$('ul.tree.dhtml span.grower').click(function(){toggleBranch($(this));});$('ul.tree.dhtml').addClass('dynamized');$('ul.tree.dhtml').removeClass('dhtml');}});function openBranch(jQueryElement,noAnimation)
{jQueryElement.addClass('OPEN').removeClass('CLOSE');if(noAnimation)
jQueryElement.parent().find('ul:first').show();else
jQueryElement.parent().find('ul:first').slideDown();}
function closeBranch(jQueryElement,noAnimation)
{jQueryElement.addClass('CLOSE').removeClass('OPEN');if(noAnimation)
jQueryElement.parent().find('ul:first').hide();else
jQueryElement.parent().find('ul:first').slideUp();}
function toggleBranch(jQueryElement,noAnimation)
{if(jQueryElement.hasClass('OPEN'))
closeBranch(jQueryElement,noAnimation);else
openBranch(jQueryElement,noAnimation);};;$(document).ready(function(){$('#newsletter-input').on({focus:function(){if($(this).val()==placeholder_blocknewsletter||$(this).val()==msg_newsl)
$(this).val('');},blur:function(){if($(this).val()=='')
$(this).val(placeholder_blocknewsletter);}});var cssClass='alert alert-danger';if(typeof nw_error!='undefined'&&!nw_error)
cssClass='alert alert-success';if(typeof msg_newsl!='undefined'&&msg_newsl)
{$('#columns').prepend('<div class="clearfix"></div><p class="'+cssClass+'"> '+alert_blocknewsletter+'</p>');$('html, body').animate({scrollTop:$('#columns').offset().top},'slow');}});;(function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value;};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options);});},result:function(handler){return this.bind("result",handler);},search:function(handler){return this.trigger("search",[handler]);},flushCache:function(){return this.trigger("flushCache");},setOptions:function(options){return this.trigger("setOptions",[options]);},unautocomplete:function(){return this.trigger("unautocomplete");}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);var blockSubmit;$.browser.opera&&$(input.form).bind("submit.autocomplete",function(){if(blockSubmit){blockSubmit=false;return false;}});$input.bind(($.browser.opera?"keypress":"keydown")+".autocomplete",function(event){lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev();}else{onChange(0,true);}
break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next();}else{onChange(0,true);}
break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp();}else{onChange(0,true);}
break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown();}else{onChange(0,true);}
break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){event.preventDefault();blockSubmit=true;return false;}
break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break;}}).focus(function(){hasFocus++;}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults();}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true);}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break;}}}
if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value]);}
$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback);});}).bind("flushCache",function(){cache.flush();}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])
cache.populate();}).bind("unautocomplete",function(){select.unbind();$input.unbind();$(input.form).unbind(".autocomplete");});function selectCurrent(){var selected=select.selected();if(!selected)
return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){v=words.slice(0,words.length-1).join(options.multipleSeparator)+options.multipleSeparator+v;}
v+=options.multipleSeparator;}
$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true;}
function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return;}
var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)
return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$input.addClass(options.loadingClass);if(!options.matchCase)
currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow);}else{stopLoading();select.hide();}};function trimWords(value){if(!value){return[""];}
var words=value.split(options.multipleSeparator);var result=[];$.each(words,function(i,value){if($.trim(value))
result[i]=$.trim(value);});return result;}
function lastWord(value){if(!options.multiple)
return value;var words=trimWords(value);return words[words.length-1];}
function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$.Autocompleter.Selection(input,previousValue.length,previousValue.length+sValue.length);}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200);};function hideResultsNow(){var wasVisible=select.visible();select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result){if(options.multiple){var words=trimWords($input.val()).slice(0,-1);$input.val(words.join(options.multipleSeparator)+(words.length?options.multipleSeparator:""));}
else
$input.val("");}});}
if(wasVisible)
$.Autocompleter.Selection(input,input.value.length,input.value.length);};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show();}else{hideResultsNow();}};function request(term,success,failure){if(!options.matchCase)
term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data);}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param;});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed);}});}else{select.emptyList();failure(term);}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]};}}
return parsed;};function stopLoading(){$input.removeClass(options.loadingClass);};};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0];},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)
s=s.toLowerCase();var i=s.indexOf(sub);if(i==-1)return false;return i==0||options.matchContains;};function add(q,value){if(length>options.cacheLength){flush();}
if(!data[q]){length++;}
data[q]=value;}
function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)
continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])
stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row);}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value);});}
setTimeout(populate,25);function flush(){data={};length=0;}
return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)
return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x);}});}}
return csub;}else
if(data[q]){return data[q];}else
if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x;}});return csub;}}}
return null;}};};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)
return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE);}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false;}).mousedown(function(){config.mouseDownOnSelect=true;}).mouseup(function(){config.mouseDownOnSelect=false;});if(options.width>0)
element.css("width",options.width);needsInit=false;}
function target(event){var element=event.target;while(element&&element.tagName!="LI")
element=element.parentNode;if(!element)
return[];return element;}
function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight;});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight());}else if(offset<list.scrollTop()){list.scrollTop(offset);}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1;}else if(active>=listItems.size()){active=0;}}
function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available;}
function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])
continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)
continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i]);}
listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0;}
if($.fn.bgiframe)
list.bgiframe();}
return{display:function(d,q){init();data=d;term=q;fillList();},next:function(){moveSelect(1);},prev:function(){moveSelect(-1);},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active);}else{moveSelect(-8);}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active);}else{moveSelect(8);}},hide:function(){element&&element.hide();listItems&&listItems.removeClass(CLASSES.ACTIVE);active=-1;},visible:function(){return element&&element.is(":visible");},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0]);},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:($(input).width()+parseInt($(input).css('padding-left'))+parseInt($(input).css('padding-right'))+parseInt($(input).css('margin-left'))+parseInt($(input).css('margin-right'))),top:offset.top+input.offsetHeight,left:offset.left}).show();if(options.scroll){list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight;});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")));}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data");},emptyList:function(){list&&list.empty();},unbind:function(){element&&element.remove();}};};$.Autocompleter.Selection=function(field,start,end){if(field.createTextRange){var selRange=field.createTextRange();selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}else if(field.setSelectionRange){field.setSelectionRange(start,end);}else{if(field.selectionStart){field.selectionStart=start;field.selectionEnd=end;}}
field.focus();};})(jQuery);;var instantSearchQueries=[];$(document).ready(function()
{if(typeof blocksearch_type=='undefined')
return;if(typeof instantsearch!='undefined'&&instantsearch)
$("#search_query_"+blocksearch_type).keyup(function(){if($(this).val().length>4)
{stopInstantSearchQueries();instantSearchQuery=$.ajax({url:search_url+'?rand='+new Date().getTime(),data:{instantSearch:1,id_lang:id_lang,q:$(this).val()},dataType:'html',type:'POST',headers:{"cache-control":"no-cache"},async:true,cache:false,success:function(data){if($("#search_query_"+blocksearch_type).val().length>0)
{tryToCloseInstantSearch();$('#center_column').attr('id','old_center_column');$('#old_center_column').after('<div id="center_column" class="'+$('#old_center_column').attr('class')+'">'+data+'</div>');$('#old_center_column').hide();ajaxCart.overrideButtonsInThePage();$("#instant_search_results a.close").click(function(){$("#search_query_"+blocksearch_type).val('');return tryToCloseInstantSearch();});return false;}
else
tryToCloseInstantSearch();}});instantSearchQueries.push(instantSearchQuery);}
else
tryToCloseInstantSearch();});var width_ac_results=$("#search_query_"+blocksearch_type).parent('form').width();if(typeof ajaxsearch!='undefined'&&ajaxsearch)
$("#search_query_"+blocksearch_type).autocomplete(search_url,{minChars:3,max:10,width:(width_ac_results>0?width_ac_results:500),selectFirst:false,scroll:false,dataType:"json",formatItem:function(data,i,max,value,term){return value;},parse:function(data){var mytab=new Array();for(var i=0;i<data.length;i++)
mytab[mytab.length]={data:data[i],value:data[i].cname+' > '+data[i].pname};return mytab;},extraParams:{ajaxSearch:1,id_lang:id_lang}}).result(function(event,data,formatted){$('#search_query_'+blocksearch_type).val(data.pname);document.location.href=data.product_link;});});function tryToCloseInstantSearch()
{if($('#old_center_column').length>0)
{$('#center_column').remove();$('#old_center_column').attr('id','center_column');$('#center_column').show();return false;}}
function stopInstantSearchQueries()
{for(i=0;i<instantSearchQueries.length;i++)
instantSearchQueries[i].abort();instantSearchQueries=new Array();};;var wishlistProductsIds=[];$(document).ready(function(){wishlistRefreshStatus();$(document).on('change','select[name=wishlists]',function(){WishlistChangeDefault('wishlist_block_list',$(this).val());});$("#wishlist_button").popover({html:true,content:function(){return $("#popover-content").html();}});});function WishlistCart(id,action,id_product,id_product_attribute,quantity,id_wishlist)
{$.ajax({type:'GET',url:baseDir+'modules/blockwishlist/cart.php?rand='+new Date().getTime(),headers:{"cache-control":"no-cache"},async:true,cache:false,data:'action='+action+'&id_product='+id_product+'&quantity='+quantity+'&token='+static_token+'&id_product_attribute='+id_product_attribute+'&id_wishlist='+id_wishlist,success:function(data)
{if(action=='add')
{if(isLogged==true){wishlistProductsIdsAdd(id_product);wishlistRefreshStatus();if(!!$.prototype.fancybox)
$.fancybox.open([{type:'inline',autoScale:true,minHeight:30,content:'<p class="fancybox-error">'+added_to_wishlist+'</p>'}],{padding:0});else
alert(added_to_wishlist);}
else
{if(!!$.prototype.fancybox)
$.fancybox.open([{type:'inline',autoScale:true,minHeight:30,content:'<p class="fancybox-error">'+loggin_required+'</p>'}],{padding:0});else
alert(loggin_required);}}
if(action=='delete'){wishlistProductsIdsRemove(id_product);wishlistRefreshStatus();}
if($('#'+id).length!=0)
{$('#'+id).slideUp('normal');document.getElementById(id).innerHTML=data;$('#'+id).slideDown('normal');}}});}
function WishlistChangeDefault(id,id_wishlist)
{$.ajax({type:'GET',url:baseDir+'modules/blockwishlist/cart.php?rand='+new Date().getTime(),headers:{"cache-control":"no-cache"},async:true,data:'id_wishlist='+id_wishlist+'&token='+static_token,cache:false,success:function(data)
{$('#'+id).slideUp('normal');document.getElementById(id).innerHTML=data;$('#'+id).slideDown('normal');}});}
function WishlistBuyProduct(token,id_product,id_product_attribute,id_quantity,button,ajax)
{if(ajax)
ajaxCart.add(id_product,id_product_attribute,false,button,1,[token,id_quantity]);else
{$('#'+id_quantity).val(0);WishlistAddProductCart(token,id_product,id_product_attribute,id_quantity)
document.forms['addtocart'+'_'+id_product+'_'+id_product_attribute].method='POST';document.forms['addtocart'+'_'+id_product+'_'+id_product_attribute].action=baseUri+'?controller=cart';document.forms['addtocart'+'_'+id_product+'_'+id_product_attribute].elements['token'].value=static_token;document.forms['addtocart'+'_'+id_product+'_'+id_product_attribute].submit();}
return(true);}
function WishlistAddProductCart(token,id_product,id_product_attribute,id_quantity)
{if($('#'+id_quantity).val()<=0)
return(false);$.ajax({type:'GET',url:baseDir+'modules/blockwishlist/buywishlistproduct.php?rand='+new Date().getTime(),headers:{"cache-control":"no-cache"},data:'token='+token+'&static_token='+static_token+'&id_product='+id_product+'&id_product_attribute='+id_product_attribute,async:true,cache:false,success:function(data)
{if(data)
{if(!!$.prototype.fancybox)
$.fancybox.open([{type:'inline',autoScale:true,minHeight:30,content:'<p class="fancybox-error">'+data+'</p>'}],{padding:0});else
alert(data);}
else
$('#'+id_quantity).val($('#'+id_quantity).val()-1);}});return(true);}
function WishlistManage(id,id_wishlist)
{$.ajax({type:'GET',async:true,url:baseDir+'modules/blockwishlist/managewishlist.php?rand='+new Date().getTime(),headers:{"cache-control":"no-cache"},data:'id_wishlist='+id_wishlist+'&refresh='+false,cache:false,success:function(data)
{$('#'+id).hide();document.getElementById(id).innerHTML=data;$('#'+id).fadeIn('slow');}});}
function WishlistProductManage(id,action,id_wishlist,id_product,id_product_attribute,quantity,priority)
{$.ajax({type:'GET',async:true,url:baseDir+'modules/blockwishlist/managewishlist.php?rand='+new Date().getTime(),headers:{"cache-control":"no-cache"},data:'action='+action+'&id_wishlist='+id_wishlist+'&id_product='+id_product+'&id_product_attribute='+id_product_attribute+'&quantity='+quantity+'&priority='+priority+'&refresh='+true,cache:false,success:function(data)
{if(action=='delete')
$('#wlp_'+id_product+'_'+id_product_attribute).fadeOut('fast');else if(action=='update')
{$('#wlp_'+id_product+'_'+id_product_attribute).fadeOut('fast');$('#wlp_'+id_product+'_'+id_product_attribute).fadeIn('fast');}
nb_products=0;$("[id^='quantity']").each(function(index,element){nb_products+=parseInt(element.value);});$("#wishlist_"+id_wishlist).children('td').eq(1).html(nb_products);}});}
function WishlistDelete(id,id_wishlist,msg)
{var res=confirm(msg);if(res==false)
return(false);if(typeof mywishlist_url=='undefined')
return(false);$.ajax({type:'GET',async:true,dataType:"json",url:mywishlist_url,headers:{"cache-control":"no-cache"},cache:false,data:{rand:new Date().getTime(),deleted:1,myajax:1,id_wishlist:id_wishlist,action:'deletelist'},success:function(data)
{var mywishlist_siblings_count=$('#'+id).siblings().length;$('#'+id).fadeOut('slow').remove();$("#block-order-detail").html('');if(mywishlist_siblings_count==0)
$("#block-history").remove();if(data.id_default)
{var td_default=$("#wishlist_"+data.id_default+" > .wishlist_default");$("#wishlist_"+data.id_default+" > .wishlist_default > a").remove();td_default.append('<p class="is_wish_list_default"><i class="icon icon-check-square"></i></p>');}}});}
function WishlistDefault(id,id_wishlist)
{if(typeof mywishlist_url=='undefined')
return(false);$.ajax({type:'GET',async:true,url:mywishlist_url,headers:{"cache-control":"no-cache"},cache:false,data:{rand:new Date().getTime(),default:1,id_wishlist:id_wishlist,myajax:1,action:'setdefault'},success:function(data)
{var old_default_id=$(".is_wish_list_default").parents("tr").attr("id");var td_check=$(".is_wish_list_default").parent();$(".is_wish_list_default").remove();td_check.append('<a href="#" onclick="javascript:event.preventDefault();(WishlistDefault(\''+old_default_id+'\', \''+old_default_id.replace("wishlist_","")+'\'));"><i class="icon icon-square"></i></a>');var td_default=$("#"+id+" > .wishlist_default");$("#"+id+" > .wishlist_default > a").remove();td_default.append('<p class="is_wish_list_default"><i class="icon icon-check-square"></i></p>');}});}
function WishlistVisibility(bought_class,id_button)
{if($('#hide'+id_button).is(':hidden'))
{$('.'+bought_class).slideDown('fast');$('#show'+id_button).hide();$('#hide'+id_button).css('display','block');}
else
{$('.'+bought_class).slideUp('fast');$('#hide'+id_button).hide();$('#show'+id_button).css('display','block');}}
function WishlistSend(id,id_wishlist,id_email)
{$.post(baseDir+'modules/blockwishlist/sendwishlist.php',{token:static_token,id_wishlist:id_wishlist,email1:$('#'+id_email+'1').val(),email2:$('#'+id_email+'2').val(),email3:$('#'+id_email+'3').val(),email4:$('#'+id_email+'4').val(),email5:$('#'+id_email+'5').val(),email6:$('#'+id_email+'6').val(),email7:$('#'+id_email+'7').val(),email8:$('#'+id_email+'8').val(),email9:$('#'+id_email+'9').val(),email10:$('#'+id_email+'10').val()},function(data)
{if(data)
{if(!!$.prototype.fancybox)
$.fancybox.open([{type:'inline',autoScale:true,minHeight:30,content:'<p class="fancybox-error">'+data+'</p>'}],{padding:0});else
alert(data);}
else
WishlistVisibility(id,'hideSendWishlist');});}
function wishlistProductsIdsAdd(id)
{if($.inArray(parseInt(id),wishlistProductsIds)==-1)
wishlistProductsIds.push(parseInt(id))}
function wishlistProductsIdsRemove(id)
{wishlistProductsIds.splice($.inArray(parseInt(id),wishlistProductsIds),1)}
function wishlistRefreshStatus()
{$('.addToWishlist').each(function(){if($.inArray(parseInt($(this).prop('rel')),wishlistProductsIds)!=-1)
$(this).addClass('checked');else
$(this).removeClass('checked');});};;(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:7,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn);}else if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector});}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});}
var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}
if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover},cfg.selector);};})(jQuery);;(function($){"use strict";var methods=(function(){var c={bcClass:'sf-breadcrumb',menuClass:'sf-js-enabled',anchorClass:'sf-with-ul',menuArrowClass:'sf-arrows'},ios=(function(){var ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(ios){$(window).load(function(){$('body').children().on('click',$.noop);});}
return ios;})(),wp7=(function(){var style=document.documentElement.style;return('behavior'in style&&'fill'in style&&/iemobile/i.test(navigator.userAgent));})(),toggleMenuClasses=function($menu,o){var classes=c.menuClass;if(o.cssArrows){classes+=' '+c.menuArrowClass;}
$menu.toggleClass(classes);},setPathToCurrent=function($menu,o){return $menu.find('li.'+o.pathClass).slice(0,o.pathLevels).addClass(o.hoverClass+' '+c.bcClass).filter(function(){return($(this).children(o.popUpSelector).hide().show().length);}).removeClass(o.pathClass);},toggleAnchorClass=function($li){$li.children('a').toggleClass(c.anchorClass);},toggleTouchAction=function($menu){var touchAction=$menu.css('ms-touch-action');touchAction=(touchAction==='pan-y')?'auto':'pan-y';$menu.css('ms-touch-action',touchAction);},applyHandlers=function($menu,o){var targets='li:has('+o.popUpSelector+')';if($.fn.hoverIntent&&!o.disableHI){$menu.hoverIntent(over,out,targets);}
else{$menu.on('mouseenter.superfish',targets,over).on('mouseleave.superfish',targets,out);}
var touchevent='MSPointerDown.superfish';if(!ios){touchevent+=' touchend.superfish';}
if(wp7){touchevent+=' mousedown.superfish';}
$menu.on('focusin.superfish','li',over).on('focusout.superfish','li',out).on(touchevent,'a',o,touchHandler);},touchHandler=function(e){var $this=$(this),$ul=$this.siblings(e.data.popUpSelector);if($ul.length>0&&$ul.is(':hidden')){$this.one('click.superfish',false);if(e.type==='MSPointerDown'){$this.trigger('focus');}else{$.proxy(over,$this.parent('li'))();}}},over=function(){var $this=$(this),o=getOptions($this);clearTimeout(o.sfTimer);$this.siblings().superfish('hide').end().superfish('show');},out=function(){var $this=$(this),o=getOptions($this);if(ios){$.proxy(close,$this,o)();}
else{clearTimeout(o.sfTimer);o.sfTimer=setTimeout($.proxy(close,$this,o),o.delay);}},close=function(o){o.retainPath=($.inArray(this[0],o.$path)>-1);this.superfish('hide');if(!this.parents('.'+o.hoverClass).length){o.onIdle.call(getMenu(this));if(o.$path.length){$.proxy(over,o.$path)();}}},getMenu=function($el){return $el.closest('.'+c.menuClass);},getOptions=function($el){return getMenu($el).data('sf-options');};return{hide:function(instant){if(this.length){var $this=this,o=getOptions($this);if(!o){return this;}
var not=(o.retainPath===true)?o.$path:'',$ul=$this.find('li.'+o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),speed=o.speedOut;if(instant){$ul.show();speed=0;}
o.retainPath=false;o.onBeforeHide.call($ul);$ul.stop(true,true).animate(o.animationOut,speed,function(){var $this=$(this);o.onHide.call($this);});}
return this;},show:function(){var o=getOptions(this);if(!o){return this;}
var $this=this.addClass(o.hoverClass),$ul=$this.children(o.popUpSelector);o.onBeforeShow.call($ul);$ul.stop(true,true).animate(o.animation,o.speed,function(){o.onShow.call($ul);});return this;},destroy:function(){return this.each(function(){var $this=$(this),o=$this.data('sf-options'),$hasPopUp;if(!o){return false;}
$hasPopUp=$this.find(o.popUpSelector).parent('li');clearTimeout(o.sfTimer);toggleMenuClasses($this,o);toggleAnchorClass($hasPopUp);toggleTouchAction($this);$this.off('.superfish').off('.hoverIntent');$hasPopUp.children(o.popUpSelector).attr('style',function(i,style){return style.replace(/display[^;]+;?/g,'');});o.$path.removeClass(o.hoverClass+' '+c.bcClass).addClass(o.pathClass);$this.find('.'+o.hoverClass).removeClass(o.hoverClass);o.onDestroy.call($this);$this.removeData('sf-options');});},init:function(op){return this.each(function(){var $this=$(this);if($this.data('sf-options')){return false;}
var o=$.extend({},$.fn.superfish.defaults,op),$hasPopUp=$this.find(o.popUpSelector).parent('li');o.$path=setPathToCurrent($this,o);$this.data('sf-options',o);toggleMenuClasses($this,o);toggleAnchorClass($hasPopUp);toggleTouchAction($this);applyHandlers($this,o);$hasPopUp.not('.'+c.bcClass).superfish('hide',true);o.onInit.call(this);});}};})();$.fn.superfish=function(method,args){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}
else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}
else{return $.error('Method '+method+' does not exist on jQuery.fn.superfish');}};$.fn.superfish.defaults={popUpSelector:'ul,.sf-mega',hoverClass:'sfHover',pathClass:'overrideThisToUse',pathLevels:1,delay:800,animation:{opacity:'show'},animationOut:{opacity:'hide'},speed:'normal',speedOut:'fast',cssArrows:true,disableHI:false,onInit:$.noop,onBeforeShow:$.noop,onShow:$.noop,onBeforeHide:$.noop,onHide:$.noop,onIdle:$.noop,onDestroy:$.noop};$.fn.extend({hideSuperfishUl:methods.hide,showSuperfishUl:methods.show});})(jQuery);;var responsiveflagMenu=false;var categoryMenu=$('ul.sf-menu');var mCategoryGrover=$('.sf-contener .cat-title');$(document).ready(function(){categoryMenu=$('ul.sf-menu');mCategoryGrover=$('.sf-contener .cat-title');responsiveMenu();$(window).resize(responsiveMenu);});function responsiveMenu()
{if($(document).width()<=767&&responsiveflagMenu==false)
{menuChange('enable');responsiveflagMenu=true;}
else if($(document).width()>=768)
{menuChange('disable');responsiveflagMenu=false;}}
function desktopInit()
{mCategoryGrover.off();mCategoryGrover.removeClass('active');$('.sf-menu > li > ul').removeClass('menu-mobile').parent().find('.menu-mobile-grover').remove();$('.sf-menu').removeAttr('style');categoryMenu.superfish('init');$('.sf-menu > li > ul').addClass('submenu-container clearfix');$('.sf-menu > li > ul').each(function(){i=0;$(this).each(function(){if($(this).attr('class')!="category-thumbnail"){i++;if(i%2==1)
$(this).addClass('first-in-line-xs');else if(i%5==1)
$(this).addClass('first-in-line-lg');}});});}
function mobileInit()
{categoryMenu.superfish('destroy');$('.sf-menu').removeAttr('style');mCategoryGrover.on('click',function(e){$(this).toggleClass('active').parent().find('ul.menu-content').stop().slideToggle('medium');return false;});$('.sf-menu > li > ul').addClass('menu-mobile clearfix').parent().prepend('<span class="menu-mobile-grover"></span>');$(".sf-menu .menu-mobile-grover").on('click',function(e){var catSubUl=$(this).next().next('.menu-mobile');if(catSubUl.is(':hidden'))
{catSubUl.slideDown();$(this).addClass('active');}
else
{catSubUl.slideUp();$(this).removeClass('active');}
return false;});$('#block_top_menu > ul:first > li > a').on('click',function(e){var parentOffset=$(this).prev().offset();var relX=parentOffset.left-e.pageX;if($(this).parent('li').find('ul').length&&relX>=0&&relX<=20)
{e.preventDefault();var mobCatSubUl=$(this).next('.menu-mobile');var mobMenuGrover=$(this).prev();if(mobCatSubUl.is(':hidden'))
{mobCatSubUl.slideDown();mobMenuGrover.addClass('active');}
else
{mobCatSubUl.slideUp();mobMenuGrover.removeClass('active');}}});}
function menuChange(status)
{status=='enable'?mobileInit():desktopInit();};