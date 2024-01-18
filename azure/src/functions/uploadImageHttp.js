const { app } = require('@azure/functions');

app.http('uploadImageHttp', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, _context) => {    
        console.log(request, 'request');
        const data = await request.formData();
        console.log(data);
        
        return { data: 'ok' }

    }
});
