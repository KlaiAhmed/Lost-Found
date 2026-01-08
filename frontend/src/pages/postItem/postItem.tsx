import axios from 'axios';
import style from './postItem.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import getCsrfToken from '../../utils/getCsrfTooken';
import FormError from '../../components/formError/formError';
import { zodResolver } from '@hookform/resolvers/zod';
import { foundItemSchema } from '../../scheams/itemFormsSchemas';
import type { FoundItemFormData } from '../../scheams/itemFormsSchemas';


const postItem = () => {
    const [isFormError, setIsFormError] = useState(null);
    
    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(foundItemSchema),
        defaultValues: {
            itemName: '',
            contactName: '',
            phone: '',
            description: '',
            category: '',
            locationFound: '',
            isDamaged: undefined,
            isShipmentPossible: undefined,
            contactMethod: undefined,
            email: undefined,
            time: undefined,
            date: undefined,
            additionalNotes: undefined,
        }
    }
    );

    const onSubmit = async (data: FoundItemFormData) => {
        try {
            const csrf = await getCsrfToken();

            const payload = new FormData();

            payload.append('itemName', data.itemName);
            payload.append('description', data.description);
            payload.append('category', data.category);
            payload.append('contactName', data.contactName);
            payload.append('state', data.state);
            payload.append('address', data.address);
            payload.append('phone', data.phone);
            payload.append('locationFound', data.locationFound);
            payload.append('deliveryPossible',String(data.isShipmentPossible ?? false));
            payload.append('isDamaged', String(data.isDamaged ?? false));

            if (data.email) payload.append('email', data.email);
            if (data.contactMethod) payload.append('contactMethod', data.contactMethod);
            if (data.time) payload.append('time', data.time);
            if (data.date) payload.append('date', data.date);
            if (data.additionalNotes) payload.append('additionalNotes', data.additionalNotes);


            payload.append('image', data.image[0]);
            console.log('Payload:', payload);

            console.log('api url :', import.meta.env.VITE_API_URL + '/api/postitem');

            await axios.post(import.meta.env.VITE_API_URL + '/api/postitem', payload, {withCredentials: true, headers: {'x-csrf-token': csrf}});

            reset();
            setIsFormError(null);
            alert('Found item posted successfully!');
        } catch (error: any) {
            console.error('Error posting found item:', error);
            setIsFormError(error.response?.data?.message || 'Failed to post found item. Please try again');
        }
    };

  return (
    <>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={style.formTitle}>Post Found Item</h1>

            {/* Item details Section */}
            <h2 className={style.formSubtitle}>Item details</h2>
            <label >Item Name</label>
            <input type="text" placeholder='Enter item name' {...register('itemName')} />
            {errors.itemName && 
                <FormError message={errors.itemName.message!} marginTop />
            }

            <label >Description</label>
            <textarea placeholder='Enter item description' {...register('description')}></textarea>
            <p className={style.descriptionNote}>Include identifying marks, colour, brand, approximate size.</p>
            {errors.description &&
                <FormError message={errors.description.message!} marginTop />
            }

            <label >Category</label>
            <select {...register('category')}>
                <option value="" hidden>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="documents">Documents</option>
                <option value="pets">Pets</option>
                <option value="vehicles">Vehicles</option>
                <option value="others">Others</option>
            </select>
            {errors.category && 
                <FormError message={errors.category.message!} marginTop/>
            }

            <label >Upload Image</label>
            <input type="file" accept="image/*" {...register('image')} />
            <span className={style.imageNote}>Supported formats: JPG, PNG. Max size: 5MB.</span>
            {errors.image && 
                <FormError message={errors.image.message!} marginTop />
            }

            {/* Contact Section */}
            <h2 className={style.formSubtitle}>Contact details</h2>
            <label >Name</label>
            <input type="text" placeholder='Enter your name' {...register('contactName')} />
            {errors.contactName && 
                <FormError message={errors.contactName.message!} marginTop />
            }

            <label >Phone</label>
            <input type="text" placeholder='Enter your phone number' {...register('phone')} />
            {errors.phone && 
                <FormError message={errors.phone.message!} marginTop />
            }

            <label >Email</label>
            <input type="email" placeholder='Enter your email address' {...register('email')} />
            {errors.email && 
                <FormError message={errors.email.message!} marginTop />
            }

            
            <label >Preferred Contact Method</label>
            <select {...register('contactMethod')}>
                <option value="" hidden >Select Contact Method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
            </select>
            {errors.contactMethod && 
                <FormError message={errors.contactMethod.message!} marginTop />
            }

            {/* Address Section */}
            <h2 className={style.formSubtitle}>Address</h2>

            <label >State</label>
            <select {...register('state')}>
                <option value="" hidden>state</option>
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
            {errors.state && 
                <FormError message={errors.state.message!} marginTop />
            }

            <label >Address</label>
            <input type="text" placeholder='Enter your address' {...register('address')} />
            {errors.address && 
                <FormError message={errors.address.message!} marginTop />
            }

            {/* Found details Section */}
            <h2 className={style.formSubtitle}>Details</h2>

            <label >Location Found</label>
            <input type="text" placeholder='Enter location where item was found' {...register('locationFound')} />
            {errors.locationFound && 
                <FormError message={errors.locationFound.message!} marginTop />
            }

            <div className={style.dateOccurredItem}>
                <label >Date Found</label>
                <input type="date" max={new Date().toISOString().split("T")[0]} {...register('date')} />
            </div>
            {errors.date && 
                <FormError message={errors.date.message!} marginTop />
            }

            <div className={style.timeOccurredItem}>
                <label>Time Found</label>
                <input type="time" {...register('time')} />
            </div>
            {errors.time && 
                <FormError message={errors.time.message!} marginTop />
            }


            {/* Additional details Section */}
            <h2 className={style.formSubtitle}>Additional details</h2>

            <label >Is the item damaged?</label>
            <select {...register('isDamaged')}>
                <option value="" hidden>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {errors.isDamaged && 
                <FormError message={errors.isDamaged.message!} marginTop />
            }
            
            <label >Is Shipment Possible ?</label>
            <select {...register('isShipmentPossible')}>
                <option value="" hidden>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {errors.isShipmentPossible && 
                <FormError message={errors.isShipmentPossible.message!} marginTop />
            }

            <label >Additional Notes</label>
            <textarea placeholder='Enter any additional notes' {...register('additionalNotes')}></textarea>
            {errors.additionalNotes && 
                <FormError message={errors.additionalNotes.message!} marginTop />
            }

            {isFormError &&
                <FormError message={isFormError} bigMarginTop centred />
            }
    
            <div className={style.formActions}>
                <button type='reset' className={style.resetButton}>Reset</button>
                <button type='submit' className={style.submitButton}>Post Item</button>
            </div>
        
        </form>
    </>
  );
}

export default postItem;
