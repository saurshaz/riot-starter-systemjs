module.exports = {
  // add logic to run after files have been created into datbase,
  // config._id is the new file created
  // config.filename is the created file name
  // config.filepath is the created file path
  // config.db is the db instance for any db operations
  postAddFileToDatabase: function (config, cb) {
    // console.log('config ', config)
    let new_file_path = config.filepath.slice('/Users/saurabhsharma/projects/frontend-app/riot-one/'.length)
    // console.log(" *** adding new files ****")
    config.db.collection('fs.files').update({_id: config._id},
      {
        '$set': {
            "filename" : "/appler/saurshaz@gmail.com/appler-riot-one/"+new_file_path, 
            
            "metadata.filename" : "/appler/saurshaz@gmail.com/appler-riot-one/"+new_file_path, 
            "metadata.project_id" : "appler-riot-one", 
            "metadata.id" : "appler-riot-one", 
            "metadata.active" : true, 
            "metadata.title" : "appler-riot-one", 
            "metadata.date_created" : "2016-04-22T05:21:14.376+0000", 
            "metadata.date_updated" : "2016-04-22T05:21:14.376+0000", 
            "metadata.username" : "saurshaz@gmail.com", 
            "metadata.user_token" : "saurshaz@gmail.com", 
            "metadata._name" : "/appler/saurshaz@gmail.com/appler-riot-one/"+new_file_path, 
            "metadata.owner" : "saurshaz@gmail.com"
        }
      },
      {$multi: true}
      , cb)
  }
}
