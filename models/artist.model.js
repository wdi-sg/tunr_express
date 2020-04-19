import Model from '/models'

class Artist extends Model{

  constructor (name, photo_url, nationality) {
    super()
    this.name = name;
    this.photo_url = photo_url
    this.nationality = nationality
  }

}


