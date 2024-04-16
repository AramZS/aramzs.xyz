// WiP

function LibraryJsonBook(aBook) {
  this.title = aBook.title
  this.id = aBook.id
  this.author = aBook.author
  this.link = aBook.link
  this.image = aBook.image
  this.date_finished = aBook.date_finished
  var notes = aBook.notes;
  if (aBook.notes && !Array.isArray(aBook.notes)) {
    notes = [aBook.notes]
  }
  this.notes = notes ? notes.map((note) => {
    return note;
  }) : []
  this.binding = aBook.binding
  this.date_started = Date.parse(aBook.date_started)
  this.date_finished = Date.parse(aBook.date_finished)
  this.last_updated = Date.parse(aBook.last_updated)
  this.reviews = aBook.reviews ? aBook.reviews.map((review) => {
    return {
      title: review.title,
      date: Date.parse(review.date),
      type: review.type === 'long' ? 'long' : 'short',
      content: review.content,
      read_status: review.read_status === 'done' ? 'done' : 'reading'
    }
  }) : []
  this.links = aBook.links ? aBook.links.map((link) => {
    return {
      url: link.url,
      last_accessed: Date.parse(link.last_accessed),
      type: link.type ? link.type : 'external'
    }
  }) : []
  this.image_source = aBook.image_source
  this.publisher = aBook.publisher
  this.additional_authors = aBook.additional_authors
  this.series = aBook.series
  this.tags = aBook.tags ? aBook.tags.map((tag) => {
    return tag
  }) : []
  this.bookIds = aBook.Ids ? aBook.Ids.map((idObj) => {
    return {
      type: ['ISBN', 'ISBN13', 'OLID', 'OCLC', 'LCCN', 'URL', 'BCID', 'GOODREADS'].includes(idObj.type) ? idObj.type : null,
      id: idObj.id,
      note: idObj.note ? idObj.note : null // To add information about URLs used as IDs.
    }
  }) : []
}


LibraryJsonBook.prototype.fill = function(newBook, reverse){
  var newLbryBook = new LibraryJsonBook(newBook)
  newLbryBook.notes = newLbryBook.notes.concat(this.notes);
  if (newLbryBook.bookIds.length <= 0){
    newLbryBook.bookIds = this.bookIds;
  } else {
    this.bookIds.forEach((anId) => {
      var check = newLbryBook.bookIds.findIndex((elm) => {
        if (anId.type && elm.type && elm.type.trim() === anId.type.trim()) {
          return true;
        } else {
          return false;
        }
      });
      if (check >= 0) {

      } else {
        newLbryBook.bookIds.push(anId)
      }
    })
  }
  if (newLbryBook.links.length <= 0){
    newLbryBook.links = this.links;
  } else {
    this.links.forEach((aLink) => {
      var check = newLbryBook.links.findIndex((elm) => {
        if (aLink.url && elm.url && elm.url.trim() === aLink.url.trim()) {
          return true;
        } else {
          return false;
        }
      });
      if (check >= 0) {

      } else {
        newLbryBook.links.push(aLink)
      }
    })
  }

  if (this.image && this.image_source){
    if (!newLbryBook.image || (newLbryBook.image == this.image)){
      newLbryBook.image_source = this.image_source;
      newLbryBook.image = this.image;
    }
  }

  if (reverse){
    return Object.assign(newLbryBook, this);
  } else {
    return Object.assign(this, newLbryBook);
  }
}

module.exports = {
  LibraryJsonBook: LibraryJsonBook
};

/** 
 * {
    "id": 102439,
    "identifiers": {
        "isbn": "0812536363",
        "isbn13": "9780812536362"
    },
    "authorSet": [
        {
            "id": null,
            "role": null,
            "name": "Vernor Vinge"
        }
    ],
    "authors": {
        "author": [
            {
                "id": null,
                "role": null,
                "name": "Vernor Vinge"
            }
        ]
    },
    "title": "Rainbows End",
    "author_l_f": "Vinge, Vernor",
    "my_rating": 5,
    "average_rating": 3.77,
    "publisher": "Tor Science Fiction",
    "format": "Paperback",
    "num_pages": 381,
    "publication_year": 2007,
    "published": 2007,
    "publishing_data": {
        "year": "2007",
        "day": 3,
        "month": 4
    },
    "exclusive_shelf": "read",
    "date_read": "",
    "date_added": "Mon Mar 02 10:28:51 -0800 2009",
    "date_updated": "Mon Mar 02 10:28:56 -0800 2009",
    "bookshelves": [
        {
            "name": "read",
            "position": null
        }
    ],
    "spoiler": "",
    "read_count": 1,
    "recommended_for": "",
    "recommended_by": "",
    "owned_copies": "0",
    "original_purchase_date": "",
    "original_purchase_location": "",
    "condition": "",
    "condition_description": "",
    "bcid": null,
    "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1316729149l/102439._SX98_.jpg"
}
 */
