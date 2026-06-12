import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import { site } from '@/config/site';

const INQUIRY_TYPES = [
  'Cover Art',
  '3D Illustration',
  'Animation / Visualizer',
  'Full Visual Identity',
  'Other',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('service') ?? '';

  const [formState, setFormState] = useState({
    artistName: '',
    email: '',
    songTitle: '',
    featuringArtists: '',
    inquiryType: INQUIRY_TYPES.includes(preselected) ? preselected : '',
    orderPaid: false,
    orderNotPaid: false,
    budget: '',
    deadline: '',
    additionalDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent' | 'mailto' | 'error'>('idle');

  const buildBrief = () => `New project inquiry — ${formState.inquiryType || 'General'}

Artist name: ${formState.artistName}
Email: ${formState.email}
Song title: ${formState.songTitle || '—'}
Featuring: ${formState.featuringArtists || '—'}
Type of inquiry: ${formState.inquiryType}
Order status: ${formState.orderPaid ? 'Already paid' : 'New inquiry (not paid)'}
Budget: ${formState.budget}
Deadline: ${formState.deadline || 'Flexible'}

Details:
${formState.additionalDetails}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    if (site.formEndpoint) {
      // Direct submission via Formspree/Web3Forms — see src/config/site.ts
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...formState,
            _subject: `New inquiry: ${formState.inquiryType} — ${formState.artistName}`,
          }),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
    } else {
      // No backend configured yet → open the visitor's email app, brief pre-filled
      const subject = encodeURIComponent(
        `Project inquiry: ${formState.inquiryType} — ${formState.artistName}`
      );
      const body = encodeURIComponent(buildBrief());
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
    }
    setIsSubmitting(false);
  };

  const handleCheckboxChange = (field: 'paid' | 'not_paid') => {
    if (field === 'paid') {
      setFormState((prev) => ({ ...prev, orderPaid: true, orderNotPaid: false }));
    } else {
      setFormState((prev) => ({ ...prev, orderPaid: false, orderNotPaid: true }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Seo
        title="Start Your Project"
        description="Tell me about your release — the song, the vibe, the deadline. Every brief is read and answered personally. Cover art from €150."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-light text-[#6da2ff] mb-6 uppercase tracking-wide">
          Start your project
        </h1>

        <div className="space-y-4 text-[15px] font-light text-gray-200 leading-relaxed mb-10">
          <p>
            Tell me about your release — the song, the vibe, the deadline. The more you
            put in the brief, the closer the first concept lands. I read and answer every
            inquiry myself.
          </p>
          <p>
            Haven't seen the numbers yet? Check{' '}
            <Link to="/pricing" className="text-[#6da2ff] hover:underline font-medium">
              pricing & services
            </Link>{' '}
            first — covers start at €150 and every project includes up to 3 revision rounds.
          </p>
          <p className="italic">
            Prefer email? Write me directly:{' '}
            <a href={`mailto:${site.email}`} className="text-[#6da2ff] hover:underline">
              {site.email}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'sent' && (
            <div className="bg-[#111] border border-green-500/30 p-4 text-green-400 text-sm">
              Your brief is in. I'll get back to you at {formState.email || 'your email'} —
              usually within a day or two.
            </div>
          )}
          {status === 'mailto' && (
            <div className="bg-[#111] border border-[#6da2ff]/30 p-4 text-[#6da2ff] text-sm">
              Your email app should open with the brief pre-filled — just press send there.
              If nothing opened, email me directly at {site.email}.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-[#111] border border-red-500/30 p-4 text-red-400 text-sm">
              Something went wrong sending the form. Email me directly at {site.email} —
              I answer those too.
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Main Artist Name / Main Logo Text{' '}
              <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <input
              required
              type="text"
              value={formState.artistName}
              onChange={(e) => setFormState({ ...formState, artistName: e.target.value })}
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
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">Song Title</label>
            <input
              type="text"
              value={formState.songTitle}
              onChange={(e) => setFormState({ ...formState, songTitle: e.target.value })}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none placeholder:text-gray-400"
              placeholder="&quot;Song&quot;"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">Featuring Artist(s)</label>
            <input
              type="text"
              value={formState.featuringArtists}
              onChange={(e) => setFormState({ ...formState, featuringArtists: e.target.value })}
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
                onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                className="w-full bg-white text-black px-3 py-2.5 appearance-none focus:outline-none"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[15px] text-gray-200 block">Reference Images & Examples</label>
            <p className="text-sm text-gray-500 leading-relaxed">
              Got moodboards, sketches or covers you like? Mention them in the details below
              and attach the files when we continue over email — references make the first
              concept land much closer.
            </p>
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
                  checked={formState.orderNotPaid}
                  onChange={() => handleCheckboxChange('not_paid')}
                  className="w-4 h-4 bg-white rounded-none cursor-pointer border-0 accent-blue-500"
                />
                <span className="text-[15px] text-gray-200">
                  New inquiry — I haven't paid anything yet
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required={!formState.orderPaid && !formState.orderNotPaid}
                  checked={formState.orderPaid}
                  onChange={() => handleCheckboxChange('paid')}
                  className="w-4 h-4 bg-white rounded-none cursor-pointer border-0 accent-blue-500"
                />
                <span className="text-[15px] text-gray-200">
                  Returning client — my order is already paid
                </span>
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
              onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none resize-none placeholder:text-gray-400"
              placeholder="ex. &quot;My budget for this artwork is €300&quot; — a range works too"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Deadline / Release Date
            </label>
            <input
              type="date"
              value={formState.deadline}
              onChange={(e) => setFormState({ ...formState, deadline: e.target.value })}
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none"
            />
            <p className="text-sm text-gray-500">
              If you have a release date, tell me now — the queue decides the timeline.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[15px] text-gray-200 block">
              Additional Details <span className="text-gray-500 text-sm">(required)</span>
            </label>
            <textarea
              required
              rows={4}
              value={formState.additionalDetails}
              onChange={(e) =>
                setFormState({ ...formState, additionalDetails: e.target.value })
              }
              className="w-full bg-white text-black px-3 py-2.5 focus:outline-none resize-none placeholder:text-gray-400"
              placeholder="The vibe, the genre, the story of the track — anything that helps me hear what you hear."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-[#6da2ff] text-black font-medium uppercase tracking-wider text-sm px-10 py-4 hover:bg-[#8ab5ff] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : 'Send the brief'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-4 text-sm text-gray-500">
              No commitment — sending a brief just starts the conversation. You'll get the
              exact quote before anything is booked.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
