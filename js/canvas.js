window.onload = function()
{
	canvas = document.getElementById('canvas');
  canvas.style.width = window.innerWidth + "px";
  setTimeout(function() {
  canvas.style.height = window.innerHeight + "px";
}, 0);
  
	context = canvas.getContext('2d');
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;

generateParticles();
  
	loop();
};

var canvas;
var context;
var width;
var height;
var particles = [];
var particlesNum = 400;
var leadParticle;
var ax = 0;
var ay = 0;
var colors = ['#D7EEFC', '#AFCFDA', '#7DA2A8', '#748194'];
var PI2 = Math.PI * 2;

function generateParticles()
{
	var i = particlesNum - 1;

	for(i; i > -1; --i)
	{
		particles[particles.length] = particle.create(Math.random() * width, Math.random() * height, colors[(Math.random() * colors.length) >> 0], (Math.random() * 10 + 1) >> 0);
	}
}

function loop()
{
	updateParticles();
	renderParticles();

	ax += 0.001;
	ay += 0.002;

	requestAnimationFrame(loop);
}

function updateParticles()
{
	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];
		var vx = (width >> 1) - p.pos.getX();
		var vy = (height >> 1) - p.pos.getY();
		var distVec = vec2.create(vx, vy);

		p.radius = Math.sin(ax + p.step) * 2 + 3;

		var gx = Math.cos(distVec.getAngle()) * 0.2;
		var gy = Math.sin(distVec.getAngle()) * 0.1;

		var gravityVec = vec2.create(gx, gy);
		var acVec = vec2.create(gravityVec.getX(),gravityVec.getY());

		p.vel.add(acVec);
		p.update();
	}
}

function renderParticles()
{
	context.fillStyle = '#111111';
	context.fillRect(0, 0, canvas.width, canvas.height);

	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];

		context.fillStyle = p.color;
		context.beginPath();
		context.arc(p.pos.x, p.pos.y, p.radius, 0, PI2);
		context.fill();
		context.closePath();
	}
}

//vec2 definition:

var vec2 =
{
	x: 1,
	y: 0,

	create: function(x, y)
	{
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);

		return obj;
	},

	setX: function(value)
	{
		this.x = value;
	},

	getX: function()
	{
		return this.x;
	},

	setY: function(value)
	{
		this.y = value;
	},

	getY: function()
	{
		return this.y;
	},

	setAngle: function(angle)
	{
		var length = this.getLength();
		this.x = Math.cos(angle) * length;
		this.y  = Math.sin(angle) * length;
	},

	getAngle: function()
	{
		return Math.atan2(this.y, this.x);
	},

	setLength: function(length)
	{
		var angle = this.getAngle();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	},

	getLength: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	getDX: function()
	{
		if(this.getLength() !== 0)
		{
			return this.x / this.getLength();
		}
		else
		{
			return 0.001;
		}
	},

	getDY: function()
	{
		if(this.getLength() !== 0)
		{
			return this.y / this.getLength();
		}
		else
		{
			return 0.001;
		}
	},

	add: function(v2)
	{
		this.x += v2.getX();
		this.y += v2.getY();
	}
};

//particle definition:

var particle =
{
	pos: null,
	vel: null,
	color: null,
	radius: null,
	step: null,

	create: function(x, y, color, radius)
	{
		var obj = Object.create(this);
		obj.pos = vec2.create(x, y);
		obj.vel = vec2.create(0, 0);
		obj.color = color;
		obj.radius = radius;
		obj.step = Math.random() * (Math.PI * 2);

		return obj;
	},

	update: function()
	{
		this.pos.add(this.vel);
	}
};