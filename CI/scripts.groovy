def getDotEnvValue(key){
    
    def lines = ENV_FILE.split('\n')
    def search = lines.find{line-> line =~ key}

    def value = search.replaceAll(key+'=', '')    
    value = value.replaceAll("[\\\r\\\n]+","")
    return value
}

return this