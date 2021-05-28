

$scope.setUI = function(node,icon, append, nf, ff, state, shader) {
 
  var indicator = 'r f '+(state<=2?1:0)+';g f '+(state>=2?1:0)+';b f 0';
  var tnode = node.trim();
  var bname = tnode;
  var tname = icon + ' ' + append;
  var wdg   = $scope.view.wdg[bname];
  
  wdg.src = tname;
  wdg.shader = shader + ";"+indicator+";nf f "+nf+";ff f "+ff;
  
  //cache these values for later
  wdg.nf = nf;
  wdg.ff = ff;
  
  $scope.$applyAsync();
}


encodeImg = function(objctx, src, textAttrs, callback) {
  //debugger;
  var retImg;
  if (src === undefined) { callback(retImg); return; }
  var image = new Image();
  image.onload = function () {
    var canvas    = document.createElement('canvas');
    canvas.width  = image.width;
    canvas.height = image.height;
     
    // Get drawing context for the Canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
     
    // Draw the actual text
    textAttrs.forEach(function(ta) {
      ctx.font      = ta.font;
      ctx.fillStyle = ta.fillcolor;
      // todo: should we allow images as well as text?
	  ctx.fillText(ta.text, ta.x, ta.y);
    });
     
    var retImg = canvas.toDataURL();
    callback(objctx, retImg, image.width, image.height);
  };
  image.src = src;
};

$scope.go = function() {
  $scope.count=0;
  
    ['navMarker'].forEach(function(i,x) {
      $scope.view.wdg[i].shader  = twx.app.isPreview() ? "Default":"panelFlag1hl;r f 1;g f 1;b f 0;nf f 1.5;ff f 6";
      $scope.view.wdg[i].src     = "app/resources/Uploaded/panelFlag1.png app/resources/Uploaded/panelFlag1mask.png";
      $scope.view.wdg[i].visible = true;
    });
 
    $scope.count+=1;
    $scope.panelText('i1',1,[ 
              {title:'Robbie the Robot'}, 
              {text:'Last emptied : Yesterday'} ,
              {text:'Collection   : friday'}
                            ],0.5,1.2,1);
    $scope.panelText('i2',1,[ 
              {title:'Smart tools'}, 
              {text:'Capacity : 2'} ,
              {text:'Setting  : Medium'}
                            ],0.5,1.2,2);
    $scope.panelText('i3',3,[ 
              {title:'Inspection OEE'}, 
              {text:'Running : 253 days'} ,
              {text:'Alerts  : 0'} ,
              {text:'Weekly total'} ,
              {value:42, x:950}
                            ],1.2,3,3);
    $scope.panelText('i4',2,[ 
              {title:'Engine OEE'}, 
              {text:'Running : 253 days'} ,
              {text:'Alerts  : 0'} ,
              {text:'Weekly total'} ,
              {value:42, x:920}
                            ],0.3,3,2);
    $scope.panelText('i5',3,[ 
              {title:'Rockwell OEE'}, 
              {alert:'Service Due'},       
              {text:'Speed : 5'} ,
              {text:'Parts Per Million : 42'} ,
              {text:'Reject Rate : 0'}
                            ],0.3,8,2);
    $scope.panelText('i6',1,[ 
              {title:'Beer'}, 
              {text:'Capacity : 300'} ,
              {text:'Setting  : Tasty!'}
                            ],0.5,1.2,1);
    $scope.panelText('i7',1,[ 
              {title:'Pizza'}, 
              {text:'Capacity : 20'} ,
              {text:'Setting  : Yummy!'}
                            ],0.5,1.2,1);
 
      $scope.flagText('navMarker',1,[ 
              {title:'Service'}, 
              {text:''},
              {text:'Puck replacement'}, 
              {text:'Due: Today'} 
                            ],0.3,8,2);
  
    var onoff = [
      {id:'traffic1', on:true},
      {id:'traffic2', on:true},
      {id:'traffic3', on:false},
      {id:'traffic4', on:false},
      {id:'traffic5', on:true},
      {id:'traffic6', on:true},
                ];
    onoff.forEach(function(i,x) {
      $scope.view.wdg[i.id].shader = "panelTraffichl;state f "+(i.on?3:1)+";speed f 1;nf f 0.5;ff f 1.2";
      $scope.view.wdg[i.id].src    = "app/resources/Uploaded/tl1.png app/resources/Uploaded/tl2.png";  
    });
/*
    $scope.count=0;


    $interval(function() {
      $scope.count+=1;
    
      
      $scope.panelText('i5',3,[ 
              {title:'Multi-Burner Hob'}, 
              {text:'Capacity : 5'} ,
              {text:'In-use   : 1'} ,
              {value:$scope.count}
			]);
      
    
      //flashing lights
      ['i1','i2','i3','i4','i5'].forEach(function(i,x) {
        var wdg = $scope.view.wdg[i];
        var c   = $scope.count % 5;
        var red = 'r f 1;g f 0;b f 0';
        var grn = 'r f 0;g f 1;b f 0';
        
        wdg.shader ="panelHilite2hl;"+(c==x?red:grn)+";nf f "+wdg.nf+";ff f "+wdg.ff;
      });
      $scope.$applyAsync();
    },1000);
*/
  
}


$scope.panelText = function(panel,idx,text,nf,ff,state) {
  
  var tblock = []; 
  var yline  = 500;
  let rgbindicator = 'rgba('+(state<=2?255:0)+','+(state>=2?255:0)+',0,1)';
  
  // build up the text bloc
  text.forEach(function (line) {
    if      (line.title!=undefined) tblock.push({text:line.title, x:500, y:365, font:'120px Arial', fillcolor:'rgba(254,150,6,1)'});
    else if (line.alert!=undefined) tblock.push({text:line.alert, x:500, y:165, font:'120px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor : rgbindicator });
    else if (line.text !=undefined) {
      tblock.push({text:line.text, x:350, y:yline, font:'96px Arial', fillcolor:'rgba(255,168,36,1)'}); yline+=150;
    }
    else if (line.value != undefined) tblock.push({text:line.value, x:line.x!=undefined?line.x :660, y:1000, font:'300px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor :'rgba(196,196,4,1)'});
  });
  
  //keep these around for the async callbac
  var cnf    = nf;
  var cff    = ff;
  var cstate = state;
  
  // async update the factory line indicator to show that we are now simulating production changes ith new line in place...
  encodeImg(panel,
            'app/resources/Uploaded/panelInfo'+idx+'.png', 
            tblock,
            function(target,img,w,h) {

              $scope.setUI(target, img, 'app/resources/Uploaded/panelInfo'+idx+'mask.png', cnf, cff, cstate, 'panelHilite2hl');

            }
  );
}

$scope.flagText = function(panel,idx,text,nf,ff,state) {
  
  var tblock = []; 
  var yline  = 500;
  let rgbblack     = 'rgba(0,0,0,1)';
  let rgbindicator = 'rgba('+(state<=2?255:0)+','+(state>=2?255:0)+',0,1)';
  
  // build up the text bloc
  text.forEach(function (line) {
    if      (line.title!=undefined) tblock.push({text:line.title, x:700, y:370, font:'140px Arial', fillcolor:rgbblack});
    else if (line.alert!=undefined) tblock.push({text:line.alert, x:700, y:165, font:'120px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor : rgbindicator });
    else if (line.text !=undefined) {
      tblock.push({text:line.text, x:450, y:yline, font:'96px Arial', fillcolor:rgbblack}); yline+=150;
    }
    else if (line.value != undefined) tblock.push({text:line.value, x:line.x!=undefined?line.x :760, y:1000, font:'300px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor :rgbblack});
  });
  
  //keep these around for the async callbac
  var cnf    = nf;
  var cff    = ff;
  var cstate = state;
  
  // async update the factory line indicator to show that we are now simulating production changes ith new line in place...
  encodeImg(panel,
            'app/resources/Uploaded/panelFlag'+idx+'.png', 
            tblock,
            function(target,img,w,h) {

              $scope.setUI(target, img, 'app/resources/Uploaded/panelFlag'+idx+'mask.png', cnf, cff, cstate, 'panelFlag1hl');

            }
  );
}

$scope.minNavDistance = 3; //for testing!!!    should proboably be at least 10...

$scope.pltrack = false;
$scope.navHeightOffFloor = 1.0;
$scope.cartHeightOffFloor = 1.2;
$scope.headpos =  undefined;
$scope.headgaze = undefined;
$scope.cartloc  = undefined;

$scope.$on('tracking', function(evt, arg) {

  if ($scope.pltrack === true) {

    // let's start by extracting the values into some helper objects
    var headpos  = new Vector4().Set3a(arg.position);	//Position as a vector
    var headgaze = new Vector4().Set3a(arg.gaze);  
    var headup   = new Vector4().Set3a(arg.up); 

    var fup = new Vector4().Set3(0,1,0);
    
    // we want a positoin 1.5m off the floor
    var hp  = new Vector4().Set3(headpos.v[0], $scope.cartHeightOffFloor - $scope.app.params.floorOffset, headpos.v[2]);
    
    // work out the horizontal gaze vector (remove vertical offset)
    var hg  = new Vector4().Set3(headgaze.v[0],0,headgaze.v[2]).Normalize();
    var xd  = fup.CrossP(hg).Normalize();
    var esf = new Matrix4().Set4V(xd,fup,hg,hp.Add(hg.Scale(0.6)));

    // keep for later
    $scope.cartloc  = esf;    
    $scope.headpos  = headpos;
    $scope.headgaze = headgaze;
  }
  
});

$scope.showPart = function(prt) {
  
  var em = $scope.cartloc.ToPosEuler(true);

  tml3dRenderer.setProperties("partslist", {shader:twx.app.isPreview() ? "Default":"desaturated_hl;nearfade f 2;blend f 0", opacity:0.5,hidden:twx.app.isPreview()?false:true,phantom:true} );
  
  // set the new position of the item - it should always be on the floor (y==0)
  tml3dRenderer.setTranslation("partslist", em.pos.X(), em.pos.Y(), em.pos.Z());
  tml3dRenderer.setRotation   ("partslist", em.rot.X(), em.rot.Y(), em.rot.Z());
  
  $scope.finder($scope.view.wdg[prt].text);
}

$scope.showCart = function() {

  // so that we know where the user is looking ...
  $scope.pltrack = true;
  
  // call the getPriceAvailability ThingWorx service based on partNumber
  console.log('calling cartThing::checkCart');
  
  //lets disable thingworx
  //twx.app.fn.triggerDataService('cartThing', 'checkCart', {})
  $scope.checkCart();
}

$scope.identifiers = [];
$scope.navigateUserTo = function() {

  $scope.pltrack = false;
  
  // hide the cart contents - note we have to manually override the cart parts
  tml3dRenderer.setProperties("partslist", {hidden:true} );
  if ($scope.identifiers != undefined) $scope.identifiers.forEach(function(v) {
    tml3dRenderer.setProperties(v, {hidden:true} );
  });
  
  // once the cart has been ordered, user is given directions to the machine - will likely show these as 'ribbon' rendered but fixed i.e. we'll compute the 
  // path once, draw the items on the floor. For this first attempt, we'll use the navigator widget and the hololens arrow.
  console.log('calling SpatialLocationHelper::getLocation');
  //twx.app.fn.triggerDataService('SpatialLocationHelper', 'getLocation', {locationID:'magnemover'})
  $scope.getMagneLocation();
}

//$scope.$on('getLocation.serviceInvokeComplete', function(evt) {   
$scope.getMagneLocation = function() {
  console.log('reponse from SpatialLocationHelper::getLocation');
  
  //var rowData = twx.app.mdl['SpatialLocationHelper'].svc['getLocation'].data;
  var rowData = [{position:"1.649 0 2.534", gaze:"0 0 1", up:"0 1 0"}]
  
  // as the user approaches the destination, we'll get the proximity trigger which will request (from thingworx) if there are any spatially pinned items - we
  // will get the pinned experience, so we will show another panel with 'related information' which will include a button to launch the pinned experience.
  if (rowData != undefined) {
    $scope.app.params.targetloc = [{ position:rowData[0].position, gaze:rowData[0].gaze, up:rowData[0].up} ];
    
    var tp = new Vector4().FromString($scope.app.params.targetloc[0].position);
    tml3dRenderer.setTranslation("navMarker",tp.X(), tp.Y(), tp.Z());
    tml3dRenderer.setProperties ("navMarker",{ hidden:false } );

    // only show the steps IF we are at a distance where the steps the floor are spaced (min) 1m apart
    var distToTarget = Math.abs(tp.Sub($scope.headpos).Length());
    
    console.log('distance to target = ',distToTarget);
    if (distToTarget > $scope.minNavDistance)
      $scope.drawPath( { from:$scope.headpos, 
                           to:tp, 
                         gaze:$scope.headgaze, 
                        floor:$scope.app.params.floorOffset
                       } );
  }
//})
}

$scope.onhold = function() {
  $scope.showCart();
}

$scope.arrived = function() {
  tml3dRenderer.setProperties("partslist", {hidden:true} );
  
  // is there anything useful, nearby?
  console.log('calling SpatialLocationHelper::getLocations');
  //twx.app.fn.triggerDataService('SpatialLocationHelper', 'getLocations', {})
  $scope.getLocations();
}

//$scope.$on('getLocations.serviceInvokeComplete', function(evt) { 
$scope.getLocations = function() {
  
  console.log('reponse from SpatialLocationHelper::getLocations');
  //here is where we would reach out to thingworx (spatial service) to ask about spatially-pinned content
  //var rowData = twx.app.mdl['SpatialLocationHelper'].svc['getLocations'].data;
  var rowData = [{position:"1.649 0 2.534", gaze:"0 0 1", up:"0 1 0"},{position:"1.649 0 2.534", gaze:"0 0 1", up:"0 1 0"},{position:"1.649 0 2.534", gaze:"0 0 1", up:"0 1 0"},{position:"1.649 0 2.534", gaze:"0 0 1", up:"0 1 0"}]
  //result should be zero or more pinned items - could be content, could be experiences.
  //in this example, we'll expect at least one experience...
  if (rowData != undefined) { 
    var nearby = [];
    var mmpos = new Vector4().FromString($scope.app.params.targetloc[0].position);
    rowData.forEach(function(row) {
      if (row.key != 'magnemover') {
        var itmpos = new Vector4().FromString(row.position);
        if (itmpos.Sub(mmpos).Length() < 1) {
          nearby.push(row.key);
        }
      }
    });
    if (nearby.length > 0) { 
      console.log(nearby);
      
      //TODO build up the popup list of nearcby content/experiences
      if ($scope.app.params.voiceEnabled===true) tml3dRenderer.synthesizeSpeech({text:"OEM Service experience is available"});
    }
    
    tml3dRenderer.setProperties("navMarker",{ hidden:true} );

    console.log('you have arrived');
    $scope.$applyAsync();
  }
//})
}

$scope.jump = function() {
  //TODO : turn this into using the results of the thingworx call i.e. this should be data that is somehow bound to the button(s) that get created above
  //
  window.location = "https://view.vuforia.com/command/view-experience?url=https%3A%2F%2Fcds-volvo.ptcxc.com%2FExperienceService%2Fcontent%2Fprojects%2Fmagnemotion_vuforialive2021_hl%2Findex.html%3FexpId%3D1";
}

$scope.finder = function(prt) {
 
  $scope.identifiers = [];
  $scope.findMeta(prt);
}

//$scope.$on('checkCart.serviceInvokeComplete', function(evt) {  
$scope.checkCart = function() {
  console.log('reponse from cartThing::checkCart');
  // get the contents of the cart and fill in e details  
  //var rowData = twx.app.mdl['cartThing'].svc['checkCart'].data;
  var rowData = [{pid:"300-5005",available:true},{pid:"100-3034",available:false}];
  var reclen  = rowData.length;
  
  // build up the cart data from this list
  if (rowData != undefined) {
    var search4 = [];
    rowData.forEach(function(row) {
      search4.push({pid:row.pid,avail:row.available});
    });

    var avc = 0;
    search4.forEach(function(x,i) {
      
      // clearly this is worng; these buttons would need to be filled dynamiclly i.e. it would be a list with data bound content
      var wdg;
      if (i==0) wdg = $scope.view.wdg.cc1;
      else      wdg = $scope.view.wdg.cc2;
      
      wdg.text     =  x.avail ? x.pid : 'unavailable';
      wdg.disabled = !x.avail;
      if (x.avail === true) 
        avc += 1;
    });
    var content = 'Checkout '+avc+' item'+(avc>1?'s':'');
    $scope.view.wdg.cartCheckout.text = content;
    
    var recvox = "IOT system recommends "+reclen+" item"+(reclen>1?"s":"");
    if (avc < reclen) recvox = recvox + ", not all are available";
    if ($scope.app.params.voiceEnabled===true) tml3dRenderer.synthesizeSpeech({text:recvox});

  }
//})
}

//highlight function. Inputs are the selected part and a boolean for hilite
$scope.hilite = function (items, hilite) {
    //
    //iterate over each item that is used as an imported variable for the function using .forEach to look at each value that comes in the items input
    items.forEach(function (item) {
        //
        //set the properties of the TML 3D Renderer to highlight the selected item using a TML Text shader. "green" is the name of the script for the TML Text.
        tml3dRenderer.setProperties(item, hilite === true ? { shader: twx.app.isPreview() ? "Default":"proximityHilite_hl", hidden: false, opacity: 1,   phantom: false, decal: false }
                                                          : { shader: twx.app.isPreview() ? "Default":"desaturated_hl",     hidden: true, opacity: 0.5, phantom: true,  decal: false } );
    }) //foreach function end
} //hilite function end

//function for using the userInput text box to search for parts
$scope.findMeta = function (search4) {
  //
  //TODO these values aledgedly would come from IOT subsystem that is recommending/predicting that these part(s) need
  //     to be replaced.  

  //
  // instead of using metadata from just the picked part, use metadata from the whole model. If resolved, proceed
  PTC.Metadata.fromId("partslist")
    .then((metadata) => {
        //
        // set a variable named options. this variable will become an array of ID paths that fit the input text.
        // 'like' will look for a partial text match to what is typed in. use 'same' to get an exact match 
        var options = metadata.find('partNo').like(search4).getSelected();

        //
        // if the text input leads to a part number so that there is an entry in the options array
        if (options != undefined && options.length > 0) {
            //
            // set an empty array called ID. This array will house the parts that contain the entered part number
            //
            // for each entry in the options array, push that value with 'quadcopter-' at the beginning into the ID array 
            options.forEach(function (i) {
                $scope.identifiers.push('partslist-' + i)
            }) //end forEach

        }
          

        //
        // highlight each object in the identifiers array with the shader
        $scope.hilite($scope.identifiers, true)

        //
        // function for removing the highlight
        var removeHilite = function (refitems) {
            //
            // return the hilite function with a value of false to the given part(s)
            return function () {
                $scope.hilite(refitems, false)
                
            } // end of return function
        } // end of turning off hilite

        //
        // remove the highlight of the selected part(s) after 3000 ms
        $timeout(removeHilite($scope.identifiers), 15000)

    }) // end .then

    //catch statement if the promise of having a part with metadata is not met
    .catch((err) => { console.log('metadata extraction failed with reason : ' + err) })

} // end findMeta function



$scope.nsteps = 20;
// declare the feet dynamically (see tml widget for the ng-repeat that uses this data)
$scope.tunnel_objects = (function() {
   var imgs = [];
   for (var i=1; i< $scope.nsteps; i++) {
     imgs.push( {name:"footsteps"+i, src:"app/resources/Uploaded/chevrons.png?name=img"});
   }
   return imgs;
 })();

//
// (re)position the feet based on the from/to points. Note that we ajust these to be on the floor
//
$scope.drawPath = function(arg) {
  var p0 = new Vector4().Set3(arg.to.X(),   $scope.navHeightOffFloor - arg.floor, arg.to.Z() );      // staring point
  var gz = new Vector4().Set3(arg.gaze.X(), 0,                                    arg.gaze.Z()).Normalize();
  var p2 = new Vector4().Set3(arg.from.X(), $scope.navHeightOffFloor - arg.floor, arg.from.Z()).Add(gz); 
  var gd = p0.Sub(p2).Length();
  var p1 = gz.Scale(gd/2).Add(p2);	// control point is halfway between eye and starting point, central to gaze vector
  
  // here we go : classic quadratic bezier spline curve
  var nsp1 = $scope.nsteps+1;
  for (var i=1; i<nsp1; i++) {
    var img = "footsteps"+i;
    
    //quadratic bezier B(t) = (1-t)^2.P0 + 2.(1-t).t.P1 + t^2.P2
    var t    = i/nsp1;
    var omt  = 1-t;
    var omt2 = omt*omt;
    var t2   = t*t;
    var bt   = p0.Scale(omt2).Add(p1.Scale(2*omt*t)).Add(p2.Scale(t2));
    tml3dRenderer.setTranslation(img,bt.X(),bt.Y(),bt.Z());
    
    //quadratic bezier differential (tangent) B'(t) = 2.(1-t).(P1-P0) + 2.t.(P2-P1)
    var bdt = p1.Sub(p0).Scale(2*omt).Add(p2.Sub(p1).Scale(2*t)).Normalize();
     
    // this is vector;we need eulers, so we convert to a matrix
    var up = new Vector4().Set3(0,1,0);
    var dp = up.DotP(bdt); 
    // check to see if the two vectors are close to being parallel
    if (Math.abs(dp) > 0.8) {
      // if so, choose a new 'up'
      up = new Vector4().Set3(0,0,1);
    }
    var xd = up.CrossP(bdt);
    // recalculate up
    up = bdt.CrossP(xd);	
    
    // build the matrix...
    var em  = new Matrix4().Set3V(xd,up,bdt);
    var r90 = new Matrix4().Rotate([1,0,0],-90,true).Multiply(em.m);

    // .. and get the eulers
    var es = r90.ToEuler(true);
    tml3dRenderer.setRotation(img,es.attitude, es.heading, es.bank);
    
  }
}

$scope.resetAll = function() {
  $scope.drawPath( { from:$scope.headpos, 
                       to:$scope.headpos, 
                     gaze:$scope.headgaze, 
                    floor:-10
                   } );

}
