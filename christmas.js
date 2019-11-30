Math.seedrandom(27)
const Crypto = CryptoJS

class User {
    constructor(username, password, firstname, lastname, birthday = new Date(0)) {
	// email
	this.username = username // String

	this.firstname = firstname
	this.lastname = lastname

	this.birthday = birthday // (millisecond)

	this.wishList = new Array() // [Wish]
	this.secretSanta = null // User

	this.password = Util.saltAndHash(this.firstname + this.birthday.toString(), password) // String

    }

    login(username, password) {
	return this.username == username && this.password == Util.saltAndHash(this.firstname + this.birthday.toString(), password)
    }

    isAdult() {
	const birthdayRequirement = new Date(new Date().getFullYear() - 18, 11, 25)
	return this.birthday < birthdayRequirement
    }

    toString() {
	return this.firstname + ' ' + this.lastname + ' (' + this.username + ')'
    }

    static setUpSecretSanta(users) {
	User.generateSecretSanta(users).forEach(([from, to]) => from.secretSanta = to)
    }

    static generateSecretSanta(users) {
	const out = users.map(user => [user, user])

	while (out.some(([from, to]) => from.lastname == to.lastname)) {
	    const a = Util.int(Math.random() * out.lenth)
	    const b = Util.int(Math.random() * out.length)

	    const temp = out[a][1]
	    out[a][1] = out[b][1]
	    out[b][1] = temp
	}

	return out
    }
}

class Util {
    static int(num) {
	return num | 0;
    }

    static saltAndHash(salt, data) {
	return Crypto.SHA256(Crypto.SHA256(salt).toString(Crypto.enc.Base64) + data).toString(Crypto.enc.Base64)
    }
}

const users = new Array()
users.push(new User('schris', '', 'Chris', 'Schneider', new Date(1953, 9, 30)))
users.push(new User('salison', '', 'Alison', 'Schneider', new Date(1985, 0, 31)))

users.push(new User('zblake', 'p9uhUja8', 'Blake', 'Ziolkowski', new Date(1997, 10, 12)))
users.push(new User('zremy', '', 'Remy', 'Ziolkowski', new Date(2000, 5, 11)))
users.push(new User('zkeith', '1111qqqq', 'Keith', 'Ziolkowski', new Date(1956, 10, 12)))
users.push(new User('zancka', 'berginc1', 'Ancka', 'Ziolkowski', new Date(1963, 10, 23)))

users.push(new User('samanda', '', 'Amanda', 'Sobczak', new Date(1989, 1, 23)))
users.push(new User('szach', '', 'Zach', 'Sobczak', new Date(1988, 9, 4)))
users.push(new User('sjonathan', 'Js123456!', 'Jonathan', 'Sobczak', new Date(1985, 0, 14)))
users.push(new User('skaren', '', 'Karen', 'Sobczak', new Date(1958, 6, 31)))
users.push(new User('sgreg', '', 'Greg', 'Sobczak', new Date(1958, 1, 23)))

users.push(new User('zlila', '', 'Lila', 'Ziolkowski ', new Date(1970)))

users.push(new User('sdeclan', '', 'Declan', 'Schneider', new Date(2017, 7, 26)))
users.push(new User('scallee', '', 'Callee', 'Schneider', new Date(2018, 0)))
users.push(new User('ssam', '', 'Sam', 'Schneider', new Date(2003, 0)))
users.push(new User('sanita', '', 'Anita', 'Sobczak', new Date(2008, 0)))
users.push(new User('zkiwi', '', 'Kiwi', 'Ziolkowski', new Date(2005, 0)))
users.push(new User('zkeanu', '', 'Keanu', 'Ziolkowski', new Date(2005, 0)))

function makeElement(type, classes = '') {
    const out = document.createElement(type)
    out.className = classes
    return out
}

function makeList(person, list) {
    const table = makeElement('table', 'table col-md-6 col-lg-4 col-xl-3')
    const head = makeElement('thead', 'thead-dark')
    table.appendChild(head)
    const headText = makeElement('tr')
    head.appendChild(headText)
    const headText2 = makeElement('th')
    headText2.textContent = person
    headText.appendChild(headText2)

    const body = makeElement('tbody')
    table.appendChild(body)
    list.forEach(item => {
	const row = makeElement('tr')
	body.appendChild(row)
	const row2 = makeElement('td')
	row2.textContent = item
	row.appendChild(row2)
    })

    return table
}

// Lists
const base = document.getElementById('base')
// Alison
const alison = users.find(user => user.username == 'salison')
alison.wishList.push('Mini Diffuser + Essential Oils')
alison.wishList.push('Gift Cards: Message and Pedicare')
alison.wishList.push('Tea Drops: Citrus Ginger and That Iced Tea')

const declan = users.find(user => user.username == 'sdeclan')
declan.wishList.push('24 Month Old Sping/Summer Clothes')
declan.wishList.push('Sand/Water Table')
declan.wishList.push('Toddler Bedding Set')
declan.wishList.push('24 Month Old Robe + Slippers')
declan.wishList.push('Books')
declan.wishList.push('Music or Cooking themed toys')
declan.wishList.push('Toy Vaccuum')
declan.wishList.push('Bath Toys')

const ancka = users.find(user => user.username == 'zancka')
ancka.wishList.push('Corkcicle Stemless: 12oz Stemless tumbler with Lid (Color: Aurora or Bursh Steel or Gloss White)')
ancka.wishList.push('Earth Therapeutics - Aloc Moisture Socks')
ancka.wishList.push('Portmeirron Bontanic Garden Salad Server Set')
ancka.wishList.push('Towel Living Stephanie 2 Piece Salad Set')
ancka.wishList.push('Peepers - Clark Bifocal Sunglasses (2.0 Color: Tortoise)')

const keith = users.find(user => user.username == 'zkeith')
keith.wishList.push('XXL Solid color V neck sweater, Not black, blue, or gray. (I have those. Instead, brown, tan, cranberry, or purple.)')
keith.wishList.push('Cool gadgets - Kitchen, electronics. (Just wander around Best Buy or Bed Bath and Beyond)')
keith.wishList.push('Wine')
keith.wishList.push('Long sleeve casual shirt XXL')
keith.wishList.push('Sports T-Shirts, Half Zip Pullovers')
keith.wishList.push('Sweatshirts XXL')
keith.wishList.push('Dark Chocolate')
keith.wishList.push('Colored Dress Socks')
keith.wishList.push('Restaurant Gift Cards')
keith.wishList.push('Salad Spinner')
keith.wishList.push('Anything that makes me look good (good luck)')

const zach = users.find(user => user.username == 'szach')
zach.wishList.push('Smart light bulbs soft white 60w equivalent')
zach.wishList.push('A19 style Northface Beanie style knit hat')
zach.wishList.push('Grey or black Men\'s leather gloves (size large)')
zach.wishList.push('Home Depot Gift Card')
zach.wishList.push('Amazon Gift Card')
zach.wishList.push('Scotch')

const adults = users.filter(user => user.isAdult())

User.setUpSecretSanta(adults)
// adults.forEach(adult => {
    // console.log(adult.firstname + '=>' + adult.secretSanta.firstname)
// })

document.querySelector("#login").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    // console.log(username)
    // console.log(password)

    const user = users.filter(user => user.login(username, password)).pop()

    if (user) {
	const login = document.getElementById('login-card')
	const secretSanta = document.getElementById('secret-santa-card')
	const secretSantaText = document.getElementById('secret-santa')

	login.style.display = 'none'

	// console.log(user)

	secretSantaText.textContent = user.secretSanta.firstname + ' ' + user.secretSanta.lastname
	secretSanta.style.display = 'block'

	users.forEach(cur => {
	    if (!cur.isAdult() || user.secretSanta.username == cur.username) {
		base.appendChild(makeList(cur.firstname, cur.wishList))
	    }
	})
    } else {
	document.getElementById('username').classList.add('is-invalid')
	document.getElementById('password').classList.add('is-invalid')
    }
})
