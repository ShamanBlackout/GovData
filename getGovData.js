 /**
  * Might have to set this up to do callbacks upon callbacks
  */
 class govData {

   constructor(){
      this.api_key = '';
      this.https = require('https');
   }

   

   initialize (path){
      let new_path = path + this.api_key;
      let options = {
         host: 'api.govinfo.gov',
         path: new_path,
         protocol: 'https:'
   
      };
      return options;

   }
   _clean(value){
     //Regular expression to keep format yyyy-MM-dd'T'HH:mm:ss'Z'
      let reExp = /([0-9]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])T([0][1-9]|[1][0-9]|[2][0-4])(:([0][1-9]|[1-5][0-9]|60)){2})Z/;
      return reExp.test(value);
   }


   /*********************************************
    * - Rest call to api.govinfo.gov. 
    * - Options must be included for this to work
    * - Returns a Promise
    *********************************************/
   restCall (options) {
      let retData = new Promise((resolve,reject)=>{
      let data = '';
      var req = this.https.get(options, (res) => {
         res.setEncoding('utf8');
         res.on('data', (chunk) => {
            data += chunk;
         });
         res.on('end',()=>{
               resolve(data);
            });

         });
      req.on('error', (e) => {
         console.error(`problem with request: ${e.message}`);
         reject(e);
      });
   });
      
      return retData;
   }
   /**********************************************************************************************************
    * Request list of collections. Response includes collectionCode,collectionName, package and granule counts
    * Returns a promise
    **********************************************************************************************************/
   getCollections(){
      
      let path = '/collections';
      let options = this.initialize(path);
      return this.restCall(options); 
    }

	/*******************************************************************************
	 * Retrieve new or updated packages for a collection given a start date and time
	 *******************************************************************************/
    updateCollectionPackage(collectionCode,lastModifiedStartDate,lastModifiedEndDate,offset,pageSize,congress,docClass){
		//Need to include Congress and DocClass option
		//Might be possible to use statement to check how many statements there are and then check if the las 3 are either a date,Int, or string

		if(lastModifiedEndDate === undefined){
			
			console.log(`${lastModifiedStartDate}`);
		}
		else{
			console.log(`${lastModifiedStartDate} & ${lastModifiedEndDate}`);
		}
   }
   /*******************************************
	* Return json summary for specified package
    *******************************************/
   packageSummary(packageID){


   }

   /**************************************************
	* Return content or metadata for specified package
    ***************************************************/
   packageMeta(packageID,contentType){

   }

   /***************************************************
	* Get a list of granules associated with a package
    ***************************************************/
   packageGranules(packageID,offset,pageSize,granuleClass,md5){

   }
   /******************************************
	* Return json summary for specified granule
    *******************************************/
   granuleSummary(packageID,granuleID){

   }
   /**************************************************
	* Return content or metadata for specified granule
    ***************************************************/
   granuleMeta(packageId,granuleID,contentType){
	   
   }

   /**********************************************************
	* Retrieve list of packages based on dateIssued value range
	**********************************************************/
   publishedPackages(dateIssuedStartDate,dateIssuedEndDate,offset,pageSize,collection,congress,docClass,modifiedSince){

   }
   


}   

//let h = new govData();
//h.updateCollectionPackage('HELLO');
module.exports = govData;
