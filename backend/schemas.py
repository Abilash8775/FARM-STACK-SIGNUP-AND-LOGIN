def information(info)-> dict:
    return{
        "id":str(info["_id"]),
        'name':info["name"],
        "email":info["email"],
        "mobile":info["mobile"],
        "password":info["password"]
    }
def information_info(infos)->list:
    return[information(info) for info in infos]
