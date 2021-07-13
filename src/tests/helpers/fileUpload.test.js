import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dltrhpk5n', 
    api_key: '255656727688518', 
    api_secret: 'Ier9wAXWdxcCNsTEyx_tXZ5g8i4'
  });
  
describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async() => {
        const resp = await 
       fetch('https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');
        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        cloudinary.v2.api.delete_resources( imageId, {}, ()=> {
        
        });
        
        })
       

    test('Debe retornar un error', async () => { 
        const file =  new File([], 'foto.jpg');
        
        const url = await fileUpload(file);
 
        expect(url).toBe(null);
     }); 
});
