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
	if (typeof item == typeof new Object()) {
	    const a = document.createElement('a')
	    a.innerHTML = item.text
	    a.href = item.link
	    row2.appendChild(a)
	} else {
	    row2.textContent = item
	}
	row.appendChild(row2)
    })

    return table
}

// Lists
const base = document.getElementById('base')

const alison = users.find(user => user.username == 'salison')
alison.wishList.push({
	text: 'Shawl (Triangle)',
	link: 'https://amzn.to/2rEb8tW'
})
alison.wishList.push({
	text: 'Color Street: Tokyo Lights, Bordeaux Glitz, No Way San Jose, Venetian Velvet',
	link: 'https://amzn.to/2qaLxsi'
})
alison.wishList.push({
	text: 'Water Bottle w/ Builtin Filter',
	link: 'https://amzn.to/2rFoKVN'
})
alison.wishList.push({
	text: 'Mini Diffuser',
	link: 'https://amzn.to/2spAZpN'
})
alison.wishList.push('Gift Card: Pedicure')
alison.wishList.push({
	text: 'Gift Card: Lush',
	link: 'https://www.lushusa.com/physical-gift-cards.html'
})

const declan = users.find(user => user.username == 'sdeclan')
declan.wishList.push({
	text: 'Dressing Frames',
	link: 'https://amzn.to/2DvPeM3'
})
declan.wishList.push({
	text: 'Easel & Paper',
	link: 'https://amzn.to/2OYwM4f'
})
declan.wishList.push({
	text: 'Kid Size Bean Bag or Similar',
	link: 'https://amzn.to/33w8xzn'
})
declan.wishList.push({
	text: '3T or 4T Robe',
	link: 'https://amzn.to/2spCfJx'
})
declan.wishList.push({
	text: 'Books',
	link: 'https://amzn.to/34BQlpy'
})
declan.wishList.push({
	text: 'Tricycle',
	link: 'https://amzn.to/2rLklAz'
})

const ancka = users.find(user => user.username == 'zancka')
ancka.wishList.push({
    text: 'iPhone 6 Armband Case',
    link: 'https://amzn.to/2OB5IZW'
})
ancka.wishList.push({
	text: 'Paderno World Cuisine Pro Slicer Mfg 4982800',
	link: 'https://amzn.to/2P0FYot'
})
ancka.wishList.push({
	text: 'Camera Backpack',
	link: 'https://amzn.to/2R28xop'
})
ancka.wishList.push({
	text: 'Art\'s Camera Gift Card',
	link: 'https://www.artscameras.com/gift-cards/'
})

const keith = users.find(user => user.username == 'zkeith')
keith.wishList.push('XXL Solid color V neck sweater, Not black, blue, or gray. (I have those. Instead, brown, tan, cranberry, or purple.)')
keith.wishList.push('Cool gadgets - Kitchen, electronics. (Just wander around Best Buy or Bed Bath and Beyond)')
keith.wishList.push('Wine')
keith.wishList.push('Long sleeve casual shirt XXL')
keith.wishList.push('Sports T-Shirts, Half Zip Pullovers')
keith.wishList.push('Sweatshirts XXL')
keith.wishList.push('Dark Chocolate')
keith.wishList.push('Restaurant Gift Cards')
keith.wishList.push('Anything that makes me look good (good luck)')

const karen = users.find(user => user.username == 'skaren')
karen.wishList.push({
	text: 'Wisconsin State Fair Elf Pack Bundle',
	link: 'https://www.etix.com/ticket/k/9974955/elf-pack-bundle-west-allis-wisconsin-state-fair-tickets'
})
karen.wishList.push({
	text: 'Cotton or cotton blend crew socks size 8-12 (for shoe size 10) any colors, or black knee highs',
	link: 'https://amzn.to/2rXs1Qu'
})
karen.wishList.push({
	text: 'Pedicure Electric Nail Trimming Grinder Tool',
	link: 'https://amzn.to/33UUy6k'
})
karen.wishList.push({
	text: 'Crock-Pot Slow cooker travel tote bag',
	link: 'https://amzn.to/33Rl2pC'
})
karen.wishList.push('Gift cards – Amazon, Smoke Shack, or Starbucks')
karen.wishList.push('Have a great idea not on this list? Surprise me!')

const greg = users.find(user => user.username == 'sgreg')
greg.wishList.push({
	text: 'MP3 player',
	link: 'https://amzn.to/33Xs5gm'
})
greg.wishList.push({
	text: 'Insulated Flannel Shirt - size large',
	link: 'https://amzn.to/2sRmUll'
})
greg.wishList.push({
	text: 'Dell Laptop Computer Battery #40WH  Type XCMRD',
	link: 'https://amzn.to/34VtwNB'
})
greg.wishList.push('Kohls gift card')

const amanda = users.find(user => user.username == 'samanda')
amanda.wishList.push({
	text: 'Metal trivet',
	link: 'https://amzn.to/2DPkjuz'
})
amanda.wishList.push({
	text: 'Mary Kay time wise pored minimizer',
	link: 'https://amzn.to/2qmBksG'
})
amanda.wishList.push({
	text: 'Coleman portable camping quad chair with 4-can cooler in arm rest',
	link: 'https://amzn.to/369agN0'
})
amanda.wishList.push('Gift cards -amazon - hobby lobby - all tied up floral cafe (call The shop or facebook them they know me)')
amanda.wishList.push({
	text: 'Frame set to hold 3 photos 4x6 horizontal photos. Either 1 piece set that holds 3 photos or 3 frames',
	link: 'https://amzn.to/2PoUwPg'
})
amanda.wishList.push({
	text: 'Flashlights - standard for when the power goes out',
	link: 'https://amzn.to/2LsSIDH'
})

const zach = users.find(user => user.username == 'szach')
zach.wishList.push('Smart light bulbs soft white 60w equivalent')
zach.wishList.push('A19 style Northface Beanie style knit hat')
zach.wishList.push('Grey or black Men\'s leather gloves (size large)')
zach.wishList.push('Home Depot Gift Card')
zach.wishList.push('Amazon Gift Card')
zach.wishList.push('Scotch')

const anita = users.find(user => user.username == 'sanita')
anita.wishList.push({
	text: 'Paw patrol dvd\'s (there are a ton of seasons)',
	link: 'amand://amzn.to/2Lpyk63'
})
anita.wishList.push({
	text: 'Riding boots / cowboy boots - size 11 (target type works)',
	link: 'https://amzn.to/2LrPYX2'
})
anita.wishList.push({
	text: 'Leather riding gloves',
	link: 'https://amzn.to/36bo0XE'
})
anita.wishList.push('Funds towards classes for STEM and Music - classes')
anita.wishList.push({
	text: 'Barbie dolls/accesories',
	link: 'https://amzn.to/2Pm6YPF'
})
anita.wishList.push({
	text: 'Melissa and Doug craft items (or similar)',
	link: 'https://amzn.to/33Rn6hm'
})
anita.wishList.push({
	text: 'Bath bombs',
	link: 'https://amzn.to/2DRTN3u'
})
anita.wishList.push({
	text: 'Legos',
	link: 'https://amzn.to/33T34D7'
})
anita.wishList.push({
	text: 'Van\'s shoes - no laces size 11',
	link: 'https://amzn.to/2YnQCtV'
})
anita.wishList.push({
	text: 'Converse shoes -no laces size 11 these are the two types of shoes that dont get destroyed immediatly unlike other brands we have tried',
	link: 'https://amzn.to/33ZEMaJ'
})
anita.wishList.push({
	text: 'Columbia fleece full zip coat - size (we had one for her that lasted 3 winters they hold up great)',
	link: 'https://amzn.to/2RoZs9b'
})
anita.wishList.push({
	text: 'cribble scrubbie (crayola) - not cat(she has 2 cats)',
	link: 'https://amzn.to/2DN9klg'
})
anita.wishList.push({
	text: 'Model magic clay (crayola)',
	link: 'https://amzn.to/2OVrGXw'
})
anita.wishList.push('Clothes size small - kids')
anita.wishList.push('Date day - dinner or lunch with Anita or "spa" day (we can coordinate while in Milwaukee or you can come up to us and go to building for kids (we have passes) or something else super fun ')

const chris = users.find(user => user.username == 'schris')
chris.wishList.push({
	text: 'Bamboo Steamer Basket(s)',
	link: 'https://amzn.to/2r1Yvsz'
})
chris.wishList.push({
	text: 'Kitchen Textiles (Gold / Gray) (Prefer Cotton)',
	link: 'https://amzn.to/2Dz7jsB'
})
chris.wishList.push({
	text: 'Bath Towels',
	link: 'https://amzn.to/37SEipT'
})

const blake = users.find(user => user.username == 'zblake')
blake.wishList.push({
	text: 'Heated Blanket (Queen)',
	link: 'https://amzn.to/2Y7a3XF'
})


const adults = users.filter(user => user.isAdult())

User.setUpSecretSanta(adults)
adults.forEach(adult => {
   console.log(adult.firstname + '=>' + adult.secretSanta.firstname)
})

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
