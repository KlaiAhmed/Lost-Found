import axios from 'axios';
import style from './lookItem.module.css';
import { useForm } from 'react-hook-form';

const lookItem = () => {
    const { 
        register, 
        handleSubmit,
        reset,
    } = useForm({
    defaultValues: {
      itemName: '',
      contactName: '',
      email: '',
      date: '',
      time: '',
      phone: '',
      description: '',
      category: '',
      locationLost: '',
      reward:'',
      additionalNotes: '',
      image: '',
      city: '',
      address: '',
      contactMethod: ''
    },
  });

    const onSubmit = async (formValues: any) => {
        try {
            const payload = new FormData();

            payload.append('title', formValues.itemName);
            payload.append('description', formValues.description || '');
            payload.append('category', formValues.category || '');

            if (formValues.date) {
                payload.append('dateFound', new Date(formValues.date).toISOString());
            }
            if (formValues.time) {
                payload.append('timeFound', formValues.time);
            }

            const holderObj = {
                address: formValues.address || '',
                city: formValues.city || '',
            };
            payload.append('holder', JSON.stringify(holderObj));

            const contactObj = {
                name: formValues.contactName || '',
                email: formValues.email || '',
                phone: formValues.phone || '',
                preferContact: formValues.contactMethod || ''
            };
            payload.append('contact', JSON.stringify(contactObj));

            const deliveryObj = {
            possible: formValues.isShipmentPossible === 'yes',
            details: formValues.additionalNotes || ''
            };
            payload.append('delivery', JSON.stringify(deliveryObj));

            if (formValues.locationFound) {
                const meetupObj = { location: formValues.locationFound };
                payload.append('meetup', JSON.stringify(meetupObj));
            }

            if (formValues.image && formValues.image.length > 0) {
                payload.append('image', formValues.image[0]);
            }

            if (formValues.additionalNotes) {
                payload.append('additionalNotes', formValues.additionalNotes);
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/api/lookitem`, payload);
            alert('Lost item posted successfully!');
            reset();
        } catch (error) {
            console.error('Error posting lost item:', error);
        }
    };

  return (
    <>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={style.formTitle}>Look for lost Items</h1>

            <h2 className={style.formSubtitle}>Item details</h2>
            <label htmlFor="">Item Name</label>
            <input type="text" placeholder='Enter item name' {...register('itemName', { required: true })} />

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
            <input type="file" accept="image/*" {...register('image')} />
            <span className={style.imageNote}>Supported formats: JPG, PNG. Max size: 5MB.</span>

            <h2 className={style.formSubtitle}>Contact details</h2>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter your name' {...register('contactName', { required: true })} />

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

            <h2 className={style.formSubtitle}>Details</h2>

            <label htmlFor="">Location Lost</label>
            <input type="text" placeholder='Enter location where item was lost' {...register('locationLost', { required: true })} />

            <div className={style.timeFoundContainer}>
                <div className={style.timeFoundItem}>
                    <label htmlFor=''>Time Lost</label>
                    <input type="time" {...register('time')} />
                </div>
            
                <div className={style.dateFoundItem}>
                    <label htmlFor="">Date Lost</label>
                    <input type="date" {...register('date')} />
                </div>
            </div>

            <h2 className={style.formSubtitle}>Additional details</h2>

            <label htmlFor="">Reward</label>
            <input type="text" placeholder='Enter reward details if any' {...register('reward')} />

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

export default lookItem;
