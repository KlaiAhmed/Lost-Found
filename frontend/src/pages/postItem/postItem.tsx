import axios from 'axios';
import style from './postItem.module.css';
import { useForm } from 'react-hook-form';

const postItem = () => {
    const { 
        register, 
        handleSubmit, 
    } = useForm({
    defaultValues: {
      name: '',
      email: '',
      date: '',
      time: '',
      phone: '',
      description: '',
      category: '',
      locationFound: '',
      isDamaged: '',
      isShipmentPossible: '',
      additionalNotes: '',
      image: '',
      city: '',
      address: '',
      contactMethod: ''
    },
  });

  const onSubmit = (data: any) => {
    try {
        axios.post(import.meta.env.VITE_API_URL + '/api/found-items', data)
    }catch (error) {
        console.error('Error posting found item:', error);
    }
  };

  return (
    <>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={style.formTitle}>Post Found Item</h1>

            <h2 className={style.formSubtitle}>Item details</h2>
            <label htmlFor="">Item Name</label>
            <input type="text" placeholder='Enter item name' {...register('name', { required: true })} />

            <label htmlFor="">Description</label>
            <textarea placeholder='Enter item description' {...register('description', { required: true })}></textarea>
            <p className={style.descriptionNote}>Include identifying marks, colour, brand, approximate size.</p>

            <label htmlFor="">Category</label>
            <select {...register('category', { required: true })}>
                <option value="" hidden>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="documents">Documents</option>
                <option value="pets">Pets</option>
                <option value="vehicles">Vehicles</option>
                <option value="others">Others</option>
            </select>

            <label htmlFor="">Upload Image</label>
            <input type="file" accept="image/*" {...register('image', { required: true })} />
            <span className={style.imageNote}>Supported formats: JPG, PNG. Max size: 5MB.</span>

            <h2 className={style.formSubtitle}>Contact details</h2>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter your name' {...register('name', { required: true })} />

            <select {...register('city', { required: true })}>
                <option value="" hidden>City</option>
                <option value="Ariana">Ariana</option>
                <option value="Béja">Béja</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Bizerte">Bizerte</option>
                <option value="Gabès">Gabès</option>
                <option value="Gafsa">Gafsa</option>
                <option value="Jendouba">Jendouba</option>
                <option value="Kairouan">Kairouan</option>
                <option value="Kasserine">Kasserine</option>
                <option value="Kébili">Kébili</option>
                <option value="Kef">Kef</option>
                <option value="Mahdia">Mahdia</option>
                <option value="Manouba">Manouba</option>
                <option value="Médenine">Médenine</option>
                <option value="Monastir">Monastir</option>
                <option value="Nabeul">Nabeul</option>
                <option value="Sfax">Sfax</option>
                <option value="Sidi Bouzid">Sidi Bouzid</option>
                <option value="Siliana">Siliana</option>
                <option value="Sousse">Sousse</option>
                <option value="Tataouine">Tataouine</option>
                <option value="Tozeur">Tozeur</option>
                <option value="Tunis">Tunis</option>
                <option value="Zaghouan">Zaghouan</option>
            </select>

            <label htmlFor="">Address</label>
            <input type="text" placeholder='Enter your address' {...register('address')} />

            <label htmlFor="">Preferred Contact Method</label>
            <select {...register('contactMethod')}>
                <option value="" hidden >Select Contact Method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
            </select>

            <label htmlFor="">Phone</label>
            <input type="text" placeholder='Enter your phone number' {...register('phone', { required: true })} />

            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter your email address' {...register('email')} />

            <h2 className={style.formSubtitle}>Found details</h2>

            <label htmlFor="">Location Found</label>
            <input type="text" placeholder='Enter location where item was found' {...register('locationFound', { required: true })} />

            <div className={style.timeFoundContainer}>
                <div className={style.timeFoundItem}>
                    <label htmlFor=''>Time Found</label>
                    <input type="time" {...register('time')} />
                </div>
            
                <div className={style.dateFoundItem}>
                    <label htmlFor="">Date Found</label>
                    <input type="date" {...register('date')} />
                </div>
            </div>

            <h2 className={style.formSubtitle}>Additional details</h2>

            <label htmlFor="">Is the item damaged?</label>
            <select {...register('isDamaged')}>
                <option value="" hidden>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            
            <label htmlFor="">Is Shipment Possible ?</label>
            <select {...register('isShipmentPossible')}>
                <option value="" hidden>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label htmlFor="">Additional Notes</label>
            <textarea placeholder='Enter any additional notes' {...register('additionalNotes')}></textarea>

            <div className={style.formActions}>
                <button type='submit' className={style.submitButton}>Post Item</button>
                <button type='reset' className={style.resetButton}>Reset</button>
            </div>
        
        </form>
    </>
  );
}

export default postItem;
