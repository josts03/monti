import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formState, setFormState] = useState({
    artistName: '',
    email: '',
    songTitle: '',
    featuringArtists: '',
    inquiryType: '',
    orderPaid: false,
    orderNotPaid: false,
    budget: '',
    deadline: '',
    additionalDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate web request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({
      artistName: '', email: '', songTitle: '', featuringArtists: '',
      inquiryType: '', orderPaid: false, orderNotPaid: false, budget: '', 
      deadline: '', additionalDetails: ''
    });
  };

  const handleCheckboxChange = (field: 'paid' | 'not_paid') => {
    if (field === 'paid') {
      setFormState(prev => ({ ...prev, orderPaid: true, orderNotPaid: false }));
    } else {
      setFormState(prev => ({ ...prev, orderPaid: false, orderNotPaid: true }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-light text-[#6da2ff] mb-6 uppercase tracking-wide">
          CONTACT US
        </h1>
        
        <div className="space-y-6 text-[15px] font-light text-gray-200 leading-relaxed mb-10">
          <p>
            Please use this page to inquire about our Design + Photography services. We encourage all visitors to complete & submit the form below specifically outlining your Artistic Direction, Consultation, or Design request(s). This helps us accurately serve you better. All questions will be answered directly and comprehensively as possible. All services provided be performed directly or under direct authority of Monti.
          </p>
          <p>
            Refer <Link to="/pricing" className="text-[#6da2ff] hover:underline font-medium">HERE</Link> for services, turn around & frequently asked questions. Thank you.
          </p>
          <p className="italic">
            Contact: <a href="mailto:info@monti.com" className="text-[#6da2ff] hover:underline">info@monti.com</a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSuccess && (
            <div className="bg-[#111] border border-green-500/30 p-4 text-green-400 text-sm mb-6">
              Message sent successfully. We will be in touch shortly.
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Main Artist Name / Main Logo Text <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <input
              required
              type="text"
              value={formState.artistName}
              onChange={e => setFormState({...formState, artistName: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none placeholder:text-gray-400"
              placeholder="Main Artist"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Email <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <input
              required
              type="email"
              value={formState.email}
              onChange={e => setFormState({...formState, email: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">Song Title</label>
            <input
              type="text"
              value={formState.songTitle}
              onChange={e => setFormState({...formState, songTitle: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none placeholder:text-gray-400"
              placeholder="&quot;Song&quot;"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">Featuring Artist(s)</label>
            <input
              type="text"
              value={formState.featuringArtists}
              onChange={e => setFormState({...formState, featuringArtists: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none placeholder:text-gray-400"
              placeholder="Artist 1, Artist 2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Type Of Inquiry <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <div className="relative">
              <select
                required
                value={formState.inquiryType}
                onChange={e => setFormState({...formState, inquiryType: e.target.value})}
                className="w-full bg-white text-black px-3 py-2.5 appearance-none focus:outline-none"
              >
                <option value="" disabled>Select an option</option>
                <option value="Cover Art">Cover Art</option>
                <option value="3D Illustration">3D Illustration</option>
                <option value="Animation / Visualizer">Animation / Visualizer</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-[15px] text-gray-200 block">Upload Images & Examples</label>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#2B303A] text-[#8C9AA9] px-6 py-2.5 text-sm uppercase rounded-[20px] hover:bg-[#383e4a] transition-colors border border-transparent hover:border-[#8C9AA9]/30"
            >
              Upload Your Files
            </button>
          </div>

          <div className="space-y-3 pt-4">
            <label className="text-[15px] text-gray-200 block">
              Order Status <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  required={!formState.orderPaid && !formState.orderNotPaid}
                  checked={formState.orderPaid}
                  onChange={() => handleCheckboxChange('paid')}
                  className="w-4 h-4 bg-white rounded-none cursor-pointer border-0 accent-blue-500" 
                />
                <span className="text-[15px] text-gray-200">I Have Paid</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  required={!formState.orderPaid && !formState.orderNotPaid}
                  checked={formState.orderNotPaid}
                  onChange={() => handleCheckboxChange('not_paid')}
                  className="w-4 h-4 bg-white rounded-none cursor-pointer border-0 accent-blue-500" 
                />
                <span className="text-[15px] text-gray-200">I Have *NOT* Paid</span>
              </label>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[15px] text-gray-200 block">
              Budget <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <textarea
              required
              rows={3}
              value={formState.budget}
              onChange={e => setFormState({...formState, budget: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none resize-none placeholder:text-gray-400"
              placeholder="ex. &quot;My current budget for Design Services for this project is $1000.00&quot;"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">Deadline</label>
            <input
              type="date"
              value={formState.deadline}
              onChange={e => setFormState({...formState, deadline: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Additional Details <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <textarea
              required
              rows={4}
              value={formState.additionalDetails}
              onChange={e => setFormState({...formState, additionalDetails: e.target.value})}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2B303A] text-[#8C9AA9] px-10 py-3 text-[15px] rounded-[20px] hover:bg-[#383e4a] transition-colors disabled:opacity-50 border border-transparent hover:border-[#8C9AA9]/30"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
